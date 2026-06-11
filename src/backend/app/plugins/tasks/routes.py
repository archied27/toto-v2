"""
endpoints for tasks plugin
"""

from fastapi import APIRouter
from app.plugins.weather.controller.controller import WeatherController

class TasksRouter:
    def __init__(self, controller: WeatherController):
        self.router = APIRouter()
        self.controller = controller
