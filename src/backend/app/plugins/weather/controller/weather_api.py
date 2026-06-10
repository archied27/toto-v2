"""
handles communication with open meteo api
"""

import aiohttp
import asyncio

class WeatherAPI:
    def __init__(self, longitude: float, latitude: float) -> None:
        self.longitude = longitude
        self.latitude = latitude
        self.base_url = "https://api.open-meteo.com/v1"
        self.forecast_days = 14

    async def get_details(self):
        """
        fetches current weather and 14 day forecast
        returns None if error occurs
        """

        params = {
            "latitude": self.latitude,
            "longitude": self.longitude,
            "daily": "weather_code,temperature_2m_max,temperature_2m_min",
            "hourly": "temperature_2m,precipitation_probability,precipitation,weather_code,uv_index,is_day",
            "current": "temperature_2m,precipitation,weather_code,is_day,uv_index",
            "forecast_days": self.forecast_days,
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(f"{self.base_url}/forecast", params=params) as response:
                    response.raise_for_status()
                    if response.status == 200:
                        data = await response.json()

            if data is None:
                return None

            return parse_response(data)
            
        except Exception as e:
            print(f"Weather API Error: {e}")
            return None

    @staticmethod
    def parse_response(data: dict) -> dict:
        """
        parses response from get_details
        """

        parsed = {}
        parsed["current_weather"] = {
            "time": data["current"]["time"],
            "temp": data["current"]["temperature_2m"],
            "precip_mm": data["current"]["precipitation"],
            "precip_prob": 100,
            "uv": data["current"]["uv_index"],
            "code": data["current"]["weather_code"],
            "is_day": bool(data["current"]["is_day"])
            }
        
        parsed["two_week_hourly"] = []
        # loops through every hour within forecast
        for i in range(len(data["hourly"]["time"])):
            parsed["two_week_hourly"].append({
                "time": data["hourly"]["time"][i],
                "temp": data["hourly"]["temperature_2m"][i],
                "precip_mm": data["hourly"]["precipitation"][i],
                "precip_prob": data["hourly"]["precipitation_probability"][i],
                "uv": data["hourly"]["uv_index"][i],
                "code": data["hourly"]["weather_code"][i],
                "is_day": bool(data["hourly"]["is_day"][i])
            })

        parsed["two_week_overview"] = []
        # loops through every day within forecast
        for i in range(len(data["daily"]["time"])):
            parsed["two_week_overview"].append({
                "time": data["daily"]["time"][i],
                "max_temp": data["daily"]["temperature_2m_max"][i],
                "min_temp": data["daily"]["temperature_2m_min"][i],
                "code": data["daily"]["weather_code"][i]
            })

        return parsed