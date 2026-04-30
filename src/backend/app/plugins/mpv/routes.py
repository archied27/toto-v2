"""
endpoints for mpv plugin
"""

from fastapi import APIRouter
from app.plugins.mpv.controller.controller import MPVController

class MPVRouter:
    def __init__(self, controller: MPVController):
        self.router = APIRouter()
        self.controller = controller
        
        self.router.add_api_route("/play", self.play, methods=["POST"])
        self.router.add_api_route("/toggle_pause", self.toggle_pause, methods=["POST"])
        self.router.add_api_route("/currently_playing", self.get_being_played, methods=["GET"])
        self.router.add_api_route("/update_db", self.update_db, methods=["POST"])

    def play(self, file: str, duration: int):
        return self.controller.play(file, duration)

    def toggle_pause(self):
        return self.controller.toggle_pause()

    async def get_being_played(self):
        return await self.controller.get_being_played()

    async def update_db(self):
        return await self.controller.update_db()