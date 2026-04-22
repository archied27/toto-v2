"""
endpoints for mpv plugin
"""

from fastapi import APIRouter
from controller import MPVController

class MPVRouter:
    def __init__(self, controller: MPVController):
        self.router = APIRouter()
        

    