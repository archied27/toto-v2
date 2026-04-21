from fastapi import FastAPI
import os
import dotenv
from app.core.event_bus import EventBus
from app.core.plugin_manager import PluginManager

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

core = {
    "bus": event_bus
}

# registers plugins
plugin_manager = PluginManager(core, app)
plugin_manager.register_plugins()

@app.get("/")
def root():
    return {"message": "backend running"}