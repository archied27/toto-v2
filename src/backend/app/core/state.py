"""
app state to store all relevant 
plugin state information
and core state information
"""

import asyncio
import inspect

@dataclass
class AppState:
    _slices: dict[str, Any] = field(default_factory=dict)
    _lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    _subscribers: list[callable] = field(default_factory=list)

    def get(self, plugin_id: str) -> Any:
        return self._slices.get(plugin_id)

    async def set(self, plugin_id: str, data: Any) -> None:
        async with self._lock:
            self._slices[plugin_id] = data
            for subscriber in self._subscribers:
                if inspect.iscoroutinefunction(subscriber):
                    await subscriber(plugin_id, data)
                else:
                    subscriber(plugin_id, data)

    def subscribe(self, fn: callable) -> None:
        self._subscribers.append(fn)

    async def snapshot(self) -> dict:
        """
        returns a full snapshot dict of the entire state
        """
        return {
            plugin_id: asdict(slice) if is_dataclass(slice) else slice
            for plugin_id, slice in self._slices.items()
        }