from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from pydantic import BaseModel
from typing import List

app = FastAPI(title="DevSprint API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    project_description: str

@app.post("/api/generate-epic")
async def generate_epic(req: ProjectRequest):
    # Dummy LLM generation route simulating async worker processing
    await asyncio.sleep(1.5) 
    return {
        "epic": f"Epic Generation for: '{req.project_description}'",
        "user_stories": [
            "As a user, I want to securely log into the system.", 
            "As an admin, I want to manage user roles.",
            "As a developer, I want to view real-time WebSocket logs."
        ],
        "sprint_tasks": [
            "Initialize repository and configure CI/CD pipeline.",
            "Set up MongoDB schemas and FastAPI controllers.",
            "Build Next.js dashboard UI."
        ]
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Broadcast the received event back to the client as a real-time update
            await websocket.send_text(f"System Action Recorded: {data}")
    except WebSocketDisconnect:
        print("WebSocket Client disconnected")
