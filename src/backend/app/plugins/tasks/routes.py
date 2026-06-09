"""
endpoints for tasks plugin
"""

from fastapi import APIRouter

class TasksRouter:
    def __init__(self, controller: MPVController):
        self.router = APIRouter()