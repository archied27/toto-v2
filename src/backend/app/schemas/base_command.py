# base.py — the contract every plugin command module must follow
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional

@dataclass
class MatchResult:
    intent: str
    confidence: float
    extracted: dict
    plugin: str

@dataclass  
class CommandResult:
    success: bool
    action: str
    response_text: str
    data: dict

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