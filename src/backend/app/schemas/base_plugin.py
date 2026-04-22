from abc import ABC, abstractmethod
from fastapi import APIRouter

class BasePlugin(ABC):
    @abstractmethod
    def setup(self, core: dict) -> None: ...

    @abstractmethod
    def get_router(self) -> APIRouter: ...

    @abstractmethod
    def get_ws_events(self) -> [str]: ...