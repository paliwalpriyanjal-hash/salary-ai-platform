import sys
import pandas as pd

from src.utils import load_object
from src.exception import CustomException


class PredictPipeline:

    def __init__(self):
        pass

    def predict(self, features):
        try:
            import numpy as np
            
            # Load saved files
            model = load_object("artifacts/best_salary_model.pkl")
            preprocessor = load_object("artifacts/preprocessor.pkl")
            scaler = load_object("artifacts/scaler.pkl")

            # Transform input data
            processed_data = preprocessor.transform(features)

            # Scale transformed data
            scaled_data = scaler.transform(processed_data)
            if hasattr(scaled_data, "toarray"):
                scaled_data = scaled_data.toarray()
            elif hasattr(scaled_data, "todense"):
                scaled_data = np.array(scaled_data.todense())

            # Predict
            prediction = model.predict(scaled_data)

            # Calculate explainability
            contributions = {}
            if hasattr(model, "coef_") and hasattr(preprocessor, "get_feature_names_out"):
                feature_names = preprocessor.get_feature_names_out()
                coefs = model.coef_
                if len(coefs.shape) > 1:
                    coefs = coefs[0]
                scaled_input = scaled_data[0]
                # Group contributions
                grouped_contribs = {
                    "Job Title": 0.0,
                    "Experience": 0.0,
                    "Education": 0.0,
                    "Skills": 0.0,
                    "Industry": 0.0,
                    "Company Size": 0.0,
                    "Location": 0.0,
                    "Remote Work": 0.0,
                    "Certifications": 0.0
                }
                
                for i, fname in enumerate(feature_names):
                    contrib = coefs[i] * scaled_input[i]
                    if "job_title" in fname:
                        grouped_contribs["Job Title"] += contrib
                    elif "experience_years" in fname:
                        grouped_contribs["Experience"] += contrib
                    elif "education_level" in fname:
                        grouped_contribs["Education"] += contrib
                    elif "skills_count" in fname:
                        grouped_contribs["Skills"] += contrib
                    elif "industry" in fname:
                        grouped_contribs["Industry"] += contrib
                    elif "company_size" in fname:
                        grouped_contribs["Company Size"] += contrib
                    elif "location" in fname:
                        grouped_contribs["Location"] += contrib
                    elif "remote_work" in fname:
                        grouped_contribs["Remote Work"] += contrib
                    elif "certifications" in fname:
                        grouped_contribs["Certifications"] += contrib

                # Format contributions
                grouped_contribs = {k: float(v) for k, v in grouped_contribs.items()}
                
                # Sort features for explanation
                sorted_features = sorted(grouped_contribs.items(), key=lambda x: x[1], reverse=True)
                top_pos = [f for f in sorted_features if f[1] > 0]
                top_neg = [f for f in sorted_features[::-1] if f[1] < 0]
                
                # Generate AI Summary based on real data
                if top_pos:
                    pos_text = f"{top_pos[0][0]}" + (f" and {top_pos[1][0]}" if len(top_pos) > 1 else "")
                    summary = f"The predicted salary is positively influenced primarily by your {pos_text}. "
                else:
                    summary = "Your profile matches the baseline expectations closely. "
                    
                if top_neg:
                    neg_text = f"{top_neg[0][0]}" + (f" and {top_neg[1][0]}" if len(top_neg) > 1 else "")
                    summary += f"However, {neg_text} slightly reduced the overall estimation."
                
                # Deterministic confidence based on distance from mean
                l2_sq = np.sum(scaled_input**2)
                conf_score = 99.0 * np.exp(-l2_sq / (42.0 * 5))
                confidence = max(50, min(99, round(conf_score, 1)))

                contributions = {
                    "base_value": float(model.intercept_) if hasattr(model, "intercept_") else 0.0,
                    "feature_contributions": grouped_contribs,
                    "top_positive": [f[0] for f in top_pos[:3]],
                    "top_negative": [f[0] for f in top_neg[:3]],
                    "confidence": confidence,
                    "ai_summary": summary,
                    "model_name": type(model).__name__,
                    "model_version": "v1.0.0" # since it's loaded from file
                }
            else:
                contributions = {
                    "base_value": 0,
                    "feature_contributions": {},
                    "top_positive": [],
                    "top_negative": [],
                    "confidence": 85.0,
                    "ai_summary": "Unable to generate explainability from the model.",
                    "model_name": "Unknown",
                    "model_version": "Unknown"
                }

            return prediction, contributions

        except Exception as e:
            raise CustomException(e, sys)


class CustomData:

    def __init__(
        self,
        job_title,
        experience_years,
        education_level,
        skills_count,
        industry,
        company_size,
        location,
        remote_work,
        certifications
    ):

        self.job_title = job_title
        self.experience_years = experience_years
        self.education_level = education_level
        self.skills_count = skills_count
        self.industry = industry
        self.company_size = company_size
        self.location = location
        self.remote_work = remote_work
        self.certifications = certifications

    def get_data_as_dataframe(self):

        data = {
            "job_title": [self.job_title],
            "experience_years": [self.experience_years],
            "education_level": [self.education_level],
            "skills_count": [self.skills_count],
            "industry": [self.industry],
            "company_size": [self.company_size],
            "location": [self.location],
            "remote_work": [self.remote_work],
            "certifications": [self.certifications]
        }

        return pd.DataFrame(data)