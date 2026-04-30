from contextlib import asynccontextmanager
import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
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

@asynccontextmanager
async def lifespan(app: FastAPI):
    event_bus = EventBus()
    scheduler = Scheduler(event_bus)
    bg_worker = BackgroundWorker(event_bus)
    ws_manager = WebSocketManager(event_bus)
    db_manager = DBManager("app/db/toto.db")
    core = Core(event_bus, bg_worker, scheduler, db_manager)

    plugin_manager = PluginManager(core, app, ws_manager)
    await plugin_manager.register_plugins()

    bg_task = asyncio.create_task(bg_worker.start())

    app.state.core = core
    app.state.ws_manager = ws_manager

    yield

    bg_worker.stop()
    bg_task.cancel()
    try:
        await bg_task
    except asyncio.CancelledError:
        pass

app = FastAPI(title="Toto Backend", lifespan=lifespan)

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

@app.get("/")
def root():
    return {"message": "backend running"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await app.state.ws_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await app.state.ws_manager.disconnect(websocket)