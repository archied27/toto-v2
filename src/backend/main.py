from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import os
import dotenv
from app.core.event_bus import EventBus
from app.core.plugin_manager import PluginManager
from app.core.scheduler import Scheduler
from app.core.background_worker import BackgroundWorker
from app.core.websocket_manager import WebSocketManager
from app.db.manager import DBManager
from app.core.core import Core

dotenv.load_dotenv()

ip_addr = os.getenv("IP_ADDR", "")
extra_origins = [addr.strip() for addr in ip_addr.split(",") if addr.strip()]

app = FastAPI(title="Toto Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ] + extra_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

event_bus = EventBus()
scheduler = Scheduler(event_bus)
bg_worker = BackgroundWorker(event_bus)
ws_manager = WebSocketManager(event_bus)
db_manager = DBManager("app/db/toto.db")

#bg_worker.start()

core = Core(event_bus, bg_worker, scheduler, db_manager)

# registers plugins
plugin_manager = PluginManager(core, app, ws_manager)
plugin_manager.register_plugins()

@app.get("/")
def root():
    return {"message": "backend running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await ws_manager.disconnect(websocket)