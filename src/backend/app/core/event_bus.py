"""
event bus class which handles communication between plugins
"""

import asyncio
import inspect
from collections import defaultdict
from typing import Callable, Any

class EventBus:
    def __init__(self):
        self._listeners = defaultdict(list)

    def on(self, event: str, handler: Callable):
        """
        adds new listener
        handler can optionally take in data
        """
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
            # if the function to be called accepts data or not
            sig = inspect.signature(handler)
            accepts_data = len(sig.parameters) > 0

            call = handler(data) if accepts_data else handler()

            # async function
            if inspect.iscoroutinefunction(handler):
                tasks.append(call)
            # normal function
            else:
                tasks.append(asyncio.to_thread(handler, data) if accepts_data else asyncio.to_thread(handler))

        await asyncio.gather(*tasks, return_exceptions=True)

    def emit_no_wait(self, event: str, data: Any = None):
        """
        emit event and don't wait
        """
        asyncio.create_task(self.emit(event, data))