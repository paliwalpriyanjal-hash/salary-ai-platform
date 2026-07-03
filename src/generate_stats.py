import pandas as pd
import numpy as np
import json
import os

def generate_stats():
    csv_path = 'data/job_salary_prediction_dataset.csv'
    if not os.path.exists(csv_path):
        print("Dataset not found!")
        return
        
    print("Loading dataset...")
    df = pd.read_csv(csv_path)
    
    stats = {}
    
    # 1. Global average
    stats["global_average"] = float(df["salary"].mean())
    
    # 2. Average by industry and job_title
    print("Computing industry-job_title averages...")
    ind_job_avg = df.groupby(["industry", "job_title"])["salary"].mean().to_dict()
    # Convert tuple keys to string keys, e.g., "Technology||Software Engineer"
    stats["ind_job_avg"] = {f"{k[0]}||{k[1]}": float(v) for k, v in ind_job_avg.items()}
    
    # 3. Average by job_title
    print("Computing job_title averages...")
    job_avg = df.groupby("job_title")["salary"].mean().to_dict()
    stats["job_avg"] = {k: float(v) for k, v in job_avg.items()}
    
    # 4. Percentile bins (1 to 100) by job_title
    print("Computing percentile bins...")
    stats["job_percentiles"] = {}
    for job in df["job_title"].unique():
        job_salaries = df[df["job_title"] == job]["salary"].values
        bins = [float(np.percentile(job_salaries, i)) for i in range(1, 101)]
        stats["job_percentiles"][job] = bins
        
    os.makedirs('artifacts', exist_ok=True)
    with open('artifacts/summary_stats.json', 'w') as f:
        json.dump(stats, f, indent=2)
    print("Summary stats generated successfully!")

if __name__ == "__main__":
    generate_stats()
