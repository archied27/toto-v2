"""
handles parsing for tasks plugin
"""

from app.schemas.base_command import BaseCommand, MatchResult, CommandResult
from app.plugins.tasks.controller.controller import TasksController
import re

class TasksCommand(BaseCommand):
    PATTERNS = []

    def __init__(self, controller: TasksController):
        self.controller = controller
        self.name = "tasks"

    def match(self, raw: str, tokens: list[str]) -> Optional[MatchResult]:
        try:
            for pattern, intent in self.PATTERNS:
                if pattern.search(raw):
                    return MatchResult(
                        intent=intent,
                        confidence=1.0,
                        extracted={},
                        plugin="tasks"
                    )
        except Exception:
            pass
        return None

    async def handle(self, match: MatchResult, raw: str) -> CommandResult:
        pass