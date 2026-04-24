#!/usr/bin/env bash

trap "kill 0" EXIT

echo "Starting Toto Backend..."
source .venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

wait