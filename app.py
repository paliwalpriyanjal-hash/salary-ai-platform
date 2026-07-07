from flask import Flask, render_template, request, redirect, url_for, jsonify
from datetime import datetime
import time
import uuid
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from src.predict import PredictPipeline
from src.predict import CustomData
from src.database import save_prediction, get_all_predictions, get_prediction_by_id, delete_prediction

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

app = Flask(
    __name__,
    template_folder=str(BASE_DIR / "templates"),
    static_folder=str(BASE_DIR / "static")
)

@app.template_filter("format_number")
def format_number(value):
    try:
        return "{:,}".format(int(value))
    except Exception:
        return value

# ======================================
# Load Pre-computed Stats at Startup
# ======================================

SUMMARY_STATS = {}
MODEL_METRICS  = {}

def _load_json(path):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except Exception:
        return {}

SUMMARY_STATS = _load_json(BASE_DIR / "artifacts" / "summary_stats.json")
MODEL_METRICS  = _load_json(BASE_DIR / "artifacts" / "model_metrics.json")


def compute_salary_stats(prediction, job_title, industry):
    """Return industry_avg, salary_diff, percentile and low/mid/high markers."""
    stats = {}

    # Industry+Job average
    key = f"{industry}||{job_title}"
    ind_job_avg = SUMMARY_STATS.get("ind_job_avg", {}).get(key)
    job_avg     = SUMMARY_STATS.get("job_avg", {}).get(job_title)
    global_avg  = SUMMARY_STATS.get("global_average")

    # Pick best available average
    industry_avg = ind_job_avg or job_avg or global_avg
    if industry_avg:
        stats["industry_avg"]  = round(industry_avg, 2)
        stats["salary_diff"]   = round(prediction - industry_avg, 2)
        stats["salary_diff_pct"] = round(((prediction - industry_avg) / industry_avg) * 100, 1)
    else:
        stats["industry_avg"]  = None
        stats["salary_diff"]   = None
        stats["salary_diff_pct"] = None

    # Percentile
    job_bins = SUMMARY_STATS.get("job_percentiles", {}).get(job_title)
    if job_bins:
        # bins[i] = value at i+1th percentile
        pct = 1
        for i, val in enumerate(job_bins):
            if prediction >= val:
                pct = i + 1
        stats["percentile"] = min(pct, 99)
        stats["salary_low"]  = round(job_bins[9], 2)    # 10th percentile
        stats["salary_mid"]  = round(job_bins[49], 2)   # 50th percentile
        stats["salary_high"] = round(job_bins[89], 2)   # 90th percentile
    else:
        stats["percentile"]  = None
        stats["salary_low"]  = None
        stats["salary_mid"]  = None
        stats["salary_high"] = None

    return stats


# ======================================
# Home Page
# ======================================

@app.route("/")
def home():
    return render_template("index.html")


# ======================================
# About AI Model Page
# ======================================

@app.route("/about")
def about():
    return render_template("about.html", metrics=MODEL_METRICS)


# ======================================
# Prediction Route
# ======================================

@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "GET":
        return render_template("predict.html")

    try:
        # Collect form inputs
        job_title        = request.form.get("job_title", "").strip()
        experience_years = request.form.get("experience_years", "0").strip()
        education_level  = request.form.get("education_level", "").strip()
        skills_count     = request.form.get("skills_count", "0").strip()
        industry         = request.form.get("industry", "").strip()
        company_size     = request.form.get("company_size", "").strip()
        location         = request.form.get("location", "").strip()
        remote_work      = request.form.get("remote_work", "").strip()
        certifications   = request.form.get("certifications", "0").strip()

        # --- Input validation ---
        errors = []
        if not job_title:
            errors.append("Job Title is required.")
        if not experience_years or not experience_years.replace(".", "").isdigit():
            errors.append("Experience Years must be a valid number.")
        if not skills_count or not skills_count.isdigit():
            errors.append("Skills Count must be a valid number.")
        if not certifications or not certifications.isdigit():
            errors.append("Certifications must be a valid number.")
        if not education_level:
            errors.append("Education Level is required.")
        if not industry:
            errors.append("Industry is required.")
        if not company_size:
            errors.append("Company Size is required.")
        if not location:
            errors.append("Location is required.")
        if not remote_work:
            errors.append("Remote Work preference is required.")

        if errors:
            return render_template(
                "error.html",
                error_type="invalid_input",
                error_title="Invalid Input",
                error_message="Please fix the following issues before submitting:",
                error_details=errors
            )

        # Type-cast
        experience_years = float(experience_years)
        skills_count     = int(skills_count)
        certifications   = int(certifications)

        # Build dataframe
        data = CustomData(
            job_title=job_title,
            experience_years=experience_years,
            education_level=education_level,
            skills_count=skills_count,
            industry=industry,
            company_size=company_size,
            location=location,
            remote_work=remote_work,
            certifications=certifications
        )
        df = data.get_data_as_dataframe()

        # Run prediction
        start = time.time()
        pipeline = PredictPipeline()
        predictions, explainability = pipeline.predict(df)
        execution_time = round(time.time() - start, 4)

        prediction_val = round(float(predictions[0]), 2)
        confidence     = explainability.get("confidence", 85.0)

        # Salary market stats
        salary_stats = compute_salary_stats(prediction_val, job_title, industry)

        # Identifiers
        prediction_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        report_id       = str(uuid.uuid4())[:8].upper()

        # Build input dict for DB
        input_dict = {
            "job_title": job_title,
            "experience_years": experience_years,
            "education_level": education_level,
            "skills_count": skills_count,
            "industry": industry,
            "company_size": company_size,
            "location": location,
            "remote_work": remote_work,
            "certifications": certifications
        }

        # Save to DB
        save_prediction(
            report_id=report_id,
            dataset_name="User Input",
            uploaded_filename="N/A",
            target_column="Salary",
            prediction=prediction_val,
            confidence=confidence,
            model_name=explainability.get("model_name", "Ridge"),
            model_version=explainability.get("model_version", "v1.0.0"),
            input_features_dict=input_dict,
            ai_summary=explainability.get("ai_summary", "Analyzed successfully."),
            recommendation="Generated based on model insights.",
            explainability_data_dict=explainability
        )

        return render_template(
            "result.html",
            prediction=prediction_val,
            job_title=job_title,
            experience_years=experience_years,
            education_level=education_level,
            skills_count=skills_count,
            industry=industry,
            company_size=company_size,
            location=location,
            remote_work=remote_work,
            certifications=certifications,
            prediction_time=prediction_time,
            confidence=confidence,
            execution_time=execution_time,
            report_id=report_id,
            explainability=json.dumps(explainability),
            salary_stats=json.dumps(salary_stats),
            model_metrics=json.dumps(MODEL_METRICS)
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return render_template(
            "error.html",
            error_type="prediction_failed",
            error_title="Prediction Failed",
            error_message="An unexpected error occurred while generating your salary prediction. Please try again.",
            error_details=[]
        ), 500


# ======================================
# History Routes
# ======================================

@app.route("/history")
def history():
    predictions = get_all_predictions()
    for p in predictions:
        if isinstance(p.get("input_features"), str):
            try:
                p["input_features_dict"] = json.loads(p["input_features"])
            except Exception:
                p["input_features_dict"] = {}
        else:
            p["input_features_dict"] = {}
    return render_template("history.html", history=predictions)


@app.route("/history/view/<report_id>")
def history_view(report_id):
    record = get_prediction_by_id(report_id)
    if not record:
        return render_template(
            "error.html",
            error_type="not_found",
            error_title="Report Not Found",
            error_message=f"No prediction report found with ID: {report_id}",
            error_details=[]
        ), 404

    input_features = json.loads(record["input_features"])
    explainability = json.loads(record["explainability_data"])

    salary_stats = compute_salary_stats(
        record["prediction"],
        input_features.get("job_title", ""),
        input_features.get("industry", "")
    )

    return render_template(
        "result.html",
        prediction=record["prediction"],
        job_title=input_features["job_title"],
        experience_years=input_features["experience_years"],
        education_level=input_features["education_level"],
        skills_count=input_features["skills_count"],
        industry=input_features["industry"],
        company_size=input_features["company_size"],
        location=input_features["location"],
        remote_work=input_features["remote_work"],
        certifications=input_features["certifications"],
        prediction_time=record["timestamp"],
        confidence=record["confidence"],
        execution_time=0.045,
        report_id=report_id,
        explainability=json.dumps(explainability),
        salary_stats=json.dumps(salary_stats),
        model_metrics=json.dumps(MODEL_METRICS),
        is_history=True
    )


@app.route("/history/delete/<report_id>", methods=["POST"])
def history_delete(report_id):
    delete_prediction(report_id)
    return redirect(url_for("history"))


# ======================================
# API: Salary Stats (for JS lookups)
# ======================================

@app.route("/api/salary-stats")
def api_salary_stats():
    job_title = request.args.get("job", "")
    industry  = request.args.get("industry", "")
    prediction = float(request.args.get("pred", 0))
    stats = compute_salary_stats(prediction, job_title, industry)
    return jsonify(stats)


# ======================================
# Run Flask
# ======================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True, use_reloader=False)