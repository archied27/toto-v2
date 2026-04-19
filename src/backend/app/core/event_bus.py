import asyncio
import inspect
from collections import defaultdict
from typing import Callable, Any

class EventBus:
    def __init__(self):
        self._listeners = defaultdict(list)

    def on(self, event: str, handler: Callable):
        self._listeners[event].append(handler)

    async def emit(self, event: str, data: Any = None):
        """
        emit event then wait all handlers are ran before continuing
        """
        handlers = self._listeners.get(event, [])

        if not handlers:
            return

        tasks = []

        for handler in handlers:
            # if async function
            if inspect.iscoroutinefunction(handler):
                tasks.append(handler(data))
            # normal function
            else:
                tasks.append(asyncio.to_thread(handler, data))

        await asyncio.gather(*tasks, return_exceptions=True)

    def emit_no_wait(self, event: str, data: Any = None):
        """
        emit event and don't wait
        """
        asyncio.create_task(self.emit(event, data))