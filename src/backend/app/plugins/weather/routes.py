"""
endpoints for weather plugin
"""

from fastapi import APIRouter
from app.plugins.weather.controller.controller import WeatherController

class WeatherRouter:
    def __init__(self, controller: WeatherController):
        self.router = APIRouter()
        self.controller = controller

        self.router.add_api_route("/update", self.update_state, methods=["POST"])

    async def update_state(self):
        return await self.controller.update_state()
