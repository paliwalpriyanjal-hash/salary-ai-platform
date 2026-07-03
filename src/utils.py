import os
import sys
import joblib

from src.exception import CustomException


def save_object(file_path, obj):
    """
    Save any Python object (model, scaler, preprocessor)
    """

    try:
        # Create folder if it doesn't exist
        dir_path = os.path.dirname(file_path)
        os.makedirs(dir_path, exist_ok=True)

        # Save object
        joblib.dump(obj, file_path)

    except Exception as e:
        raise CustomException(e, sys)


def load_object(file_path):
    """
    Load any saved Python object
    """

    try:
        # Load object
        obj = joblib.load(file_path)

        return obj

    except Exception as e:
        raise CustomException(e, sys)