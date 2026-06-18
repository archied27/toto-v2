from abc import ABC, abstractmethod
from fastapi import APIRouter
from app.core.core import Core

class BasePlugin(ABC):
    @abstractmethod
    def setup(self, core: Core) -> None: ...

    @abstractmethod
    def get_router(self) -> APIRouter: ...

    @abstractmethod
    def get_ws_events(self) -> [str]: ...

    @abstractmethod
    async def load_state(self) -> None: ...

    @abstractmethod
    async def save_state(self) -> None: ...