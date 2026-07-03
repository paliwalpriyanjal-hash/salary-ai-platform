"""
Configuration settings for AI Salary Intelligence Platform
Supports development, testing, and production environments
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


class Config:
    """Base configuration"""
    # Flask settings
    DEBUG = False
    TESTING = False
    
    # App settings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    JSON_SORT_KEYS = False
    
    # Database
    DATABASE_PATH = os.path.join(BASE_DIR, 'history.db')
    
    # Model paths
    MODEL_PATH = os.path.join(BASE_DIR, 'artifacts', 'best_salary_model.pkl')
    PREPROCESSOR_PATH = os.path.join(BASE_DIR, 'artifacts', 'preprocessor.pkl')
    SCALER_PATH = os.path.join(BASE_DIR, 'artifacts', 'scaler.pkl')
    STATS_PATH = os.path.join(BASE_DIR, 'artifacts', 'summary_stats.json')
    METRICS_PATH = os.path.join(BASE_DIR, 'artifacts', 'model_metrics.json')
    
    # Logging
    LOG_DIR = os.path.join(BASE_DIR, 'logs')
    os.makedirs(LOG_DIR, exist_ok=True)


class DevelopmentConfig(Config):
    """Development configuration"""
    DEBUG = True
    TESTING = False


class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False
    TESTING = False
    # Use environment variable for secret key in production
    SECRET_KEY = os.environ.get('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY environment variable must be set in production")


class TestingConfig(Config):
    """Testing configuration"""
    DEBUG = True
    TESTING = True
    DATABASE_PATH = ':memory:'  # Use in-memory database for tests


# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}


def get_config(env=None):
    """Get configuration based on environment"""
    if env is None:
        env = os.environ.get('FLASK_ENV', 'development')
    return config.get(env, config['default'])
