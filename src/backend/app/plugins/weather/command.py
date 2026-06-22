"""
handles parsing for weather plugin for command bar
"""

from app.schemas.base_command import BaseCommand, MatchResult, CommandResult
from app.plugins.weather.controller.controller import WeatherController
import re

class WeatherCommand(BaseCommand):
    PATTERNS = [
        (re.compile(r"^(show|display) weather$", re.I), "show_weather"),
        (re.compile(r"pollen", re.I), "show_pollen"),
        (re.compile(r"what.s\s the weather", re.I), "show_current_weather"),
        (re.compile(r"^(weather|forecast)\s+today$", re.I), "show_current_weather"),
    ]

    def __init__(self, controller: WeatherController):
        self.controller = controller
        self.name = "weather"

    def match(self, raw: str, tokens: list[str]) -> Optional[MatchResult]:
        try:
            for pattern, intent in self.PATTERNS:
                if pattern.search(raw):
                    return MatchResult(
                        intent=intent,
                        confidence=1.0,
                        extracted={},
                        plugin="weather"
                    )
        except Exception:
            pass
        return None

    async def handle(self, match: MatchResult, raw: str) -> CommandResult:
        if match.intent == "show_weather":
            return CommandResult(
                success=True,
                action="navigate",
                response_text="Opening Weather",
                data={"navigate_to": "weather"}
            )

        if match.intent == "show_pollen":
            await self.controller.update_state()
            state = await self.controller.get_current_weather()
            pollen = state["current_weather"]["grass_pollen"]
            return CommandResult(
                success=True,
                action="show_pollen",
                response_text=f"Grass Pollen: {pollen}",
                data={"pollen": pollen}
            )

        if match.intent == "show_current_weather":
            await self.controller.update_state()
            state = await self.controller.get_current_weather()
            temp = state["current_weather"]["temp"]
            code = state["current_weather"]["code"]
            is_day = state["current_weather"]["is_day"]
            return CommandResult(
                success=True,
                action="show_current_weather",
                response_text=f"Current Weather: {temp}°C,",
                data={"temperature": temp, "code": code, "is_day": is_day}
            )