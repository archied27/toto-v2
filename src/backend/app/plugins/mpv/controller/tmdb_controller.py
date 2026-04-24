"""
handles communication with tmdb api
"""

class TMDBApiController:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = 'https://api.themoviedb.org/3'