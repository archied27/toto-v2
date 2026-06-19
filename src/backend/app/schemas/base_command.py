# base.py — the contract every plugin command module must follow
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional

@dataclass
class MatchResult:
    intent: str                     # e.g. "ADD_TASK"
    confidence: float               # 0-1, how certain the match is
    extracted: dict                 # whatever the plugin pulled out
    plugin: str                     # plugin name, set by loader

@dataclass  
class CommandResult:
    success: bool
    action: str                     # what was done
    response_text: str              # human readable, shown in UI
    data: dict                      # any returned data

class BaseCommand(ABC):
    name: str

    @abstractmethod
    def match(self, raw: str, tokens: list[str]) -> Optional[MatchResult]:
        """
        Try to claim this input.
        Return MatchResult if this plugin handles it.
        Return None if it doesn't.
        Never raises — absorb exceptions and return None.
        """
        pass

    @abstractmethod
    def handle(self, match: MatchResult, raw: str) -> CommandResult:
        """
        Execute the action.
        Only called if match() returned a result.
        """
        pass