<div align="center">
  <h1> DevSprint</h1>
  <p><b>AI-Assisted Project Management Suite</b></p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
  ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
  ![WebSockets](https://img.shields.io/badge/WebSockets-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
</div>

---

##  Overview

**DevSprint** is an AI-powered project management platform built to accelerate the software development lifecycle. By leveraging Large Language Models (LLMs), it automatically translates basic project descriptions into comprehensive, structured development pipelines. 

###  Core Features
* **AI Generation:** Automatically generates Epics, User Stories, and granular Sprint Tasks from a single text prompt.
* **Real-Time Logs:** Built-in WebSockets to stream real-time updates and system actions directly to the client dashboard.
* **Containerized Architecture:** Fully Dockerized for seamless, reproducible environments across frontend, backend, and database.
* **Scalable Backend:** Asynchronous REST APIs powered by FastAPI to handle heavy LLM generation workloads without blocking.

---

##  Architecture & Tech Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Frontend** | Next.js & React | Client-side dashboard with state management and real-time WebSocket listeners. |
| **Backend** | FastAPI (Python) | High-performance async API handling client requests and LLM integrations. |
| **Database** | MongoDB | NoSQL database for flexible storage of unstructured AI-generated sprint data. |
| **DevOps** | Docker & Compose | Multi-container orchestration to spin up the entire stack with a single command. |

---

##  Getting Started

Follow these steps to run the complete full-stack environment locally on your machine.

### Prerequisites
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/zinmeir/devsprint.git](https://github.com/zinmeir/devsprint.git)
   cd devsprint
   ```

2. **Build and spin up the Docker containers:**
   ```bash
   docker compose up --build
   ```

3. **Access the application:**
   * **Frontend UI:** Navigate to `http://localhost:3000`
   * **Backend API Docs (Swagger UI):** Navigate to `http://localhost:8000/docs`

---

##  Future Roadmap (AWS Deployment)

The next phase of this project involves shifting from local Docker development to a production-ready cloud environment. The planned deployment architecture includes:

* Hosting the containerized backend on **AWS EC2**.
* Using **Nginx** as a reverse proxy to manage incoming traffic and WebSocket connections.
* Integrating **OpenAI/Anthropic API** directly into the async worker pipeline for production-grade LLM inference.

---

<div align="center">
  <i>Built by <a href="https://github.com/zinmeir">Muhammad Shaheer Akhtar</a></i>
</div>
