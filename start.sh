# start a session with two panes side by side
tmux new-session -s toto \; \
  send-keys 'cd src/frontend && npm run dev' Enter \; \
  split-window -h \; \
  send-keys 'cd src/backend && source .venv/bin/activate && uvicorn main:app --reload ...' Enter
