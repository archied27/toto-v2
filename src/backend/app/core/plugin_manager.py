"""
registers all plugins in app/plugins folder
each plugin is a folder which must contain a plugin.py file
    this file must contain a class for the plugin which must have
    get_name(),
    setup(core), get_router() and get_ws_events()
"""

import os
import importlib.util
import inspect
from fastapi import FastAPI
from app.core.websocket_manager import WebSocketManager
from app.core.core import Core

class PluginManager:
    def __init__(self, core: Core, app: FastAPI, ws_manager: WebSocketManager):
        self.core = core
        self.app = app
        self.router = app.router
        self.ws_manager = ws_manager

    def register_plugins(self) -> None:
        """
        registers plugins
        sets them up with core and adds to router
        """
        for dirpath, dirnames, filenames in os.walk("app/plugins/"):
            if 'plugin.py' in filenames:
                print("found")
                # each folder in plugins with a plugin.py file
                plugin = self.get_plugin_object(dirpath + "/plugin.py")
                plugin.setup(self.core)
                self.add_router(plugin, plugin.get_name())
                self.ws_manager.forward_many(plugin.get_ws_events())


    def add_router(self, plugin, name) -> None:
        """
        adds plugins routes to the http router
        takes in plugin class
        """
        try:
            self.app.include_router(plugin.get_router(), prefix=f"/{name}", tags=[name])
        except AttributeError:
            raise ValueError(f"No get_router() in: {type(plugin).__name__}")

    def get_plugin_object(self, path: str) -> object:
        """
        returns object of the plugin class
        takes in path to plugin.py file
        """
        spec = importlib.util.spec_from_file_location("plugin_name", path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)

        classes = [
            obj for _, obj in inspect.getmembers(module, inspect.isclass)
            if obj.__module__ == module.__name__
        ]

        if not classes:
            raise ValueError(f"No class in: {path}")

        Plugin = classes[0]
        return Plugin()