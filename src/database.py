import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.environ.get("DATABASE_PATH", os.path.join(os.path.dirname(os.path.dirname(__file__)), 'history.db'))

def init_db():
    db_dir = os.path.dirname(os.path.abspath(DB_PATH))
    if db_dir:
        os.makedirs(db_dir, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS prediction_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            report_id TEXT UNIQUE,
            timestamp TEXT,
            dataset_name TEXT,
            uploaded_filename TEXT,
            target_column TEXT,
            prediction REAL,
            confidence REAL,
            model_name TEXT,
            model_version TEXT,
            input_features TEXT,
            ai_summary TEXT,
            recommendation TEXT,
            report_path TEXT,
            explainability_data TEXT
        )
    ''')
    conn.commit()
    conn.close()

def save_prediction(
    report_id, dataset_name, uploaded_filename, target_column, 
    prediction, confidence, model_name, model_version, 
    input_features_dict, ai_summary, recommendation, explainability_data_dict
):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    cursor.execute('''
        INSERT INTO prediction_history (
            report_id, timestamp, dataset_name, uploaded_filename, target_column,
            prediction, confidence, model_name, model_version, input_features,
            ai_summary, recommendation, explainability_data
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        report_id, timestamp, dataset_name, uploaded_filename, target_column,
        prediction, confidence, model_name, model_version, 
        json.dumps(input_features_dict), ai_summary, recommendation, 
        json.dumps(explainability_data_dict)
    ))
    conn.commit()
    conn.close()

def get_all_predictions():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM prediction_history ORDER BY id DESC')
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def get_prediction_by_id(report_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM prediction_history WHERE report_id = ?', (report_id,))
    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def delete_prediction(report_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM prediction_history WHERE report_id = ?', (report_id,))
    conn.commit()
    conn.close()

# Initialize DB on import
init_db()
