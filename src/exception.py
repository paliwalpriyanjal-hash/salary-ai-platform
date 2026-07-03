import sys
from src.logger import logger


class CustomException(Exception):
    def __init__(self, error_message, error_detail: sys):
        super().__init__(error_message)
        self.error_message = self.get_detailed_error_message(
            error_message,
            error_detail
        )

    def get_detailed_error_message(self, error_message, error_detail: sys):

        _, _, exc_tb = error_detail.exc_info()

        file_name = exc_tb.tb_frame.f_code.co_filename

        return f"""
Error occurred in Python script:
File Name : {file_name}
Line Number : {exc_tb.tb_lineno}
Error Message : {error_message}
"""

    def __str__(self):
        return self.error_message