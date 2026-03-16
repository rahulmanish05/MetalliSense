
# MetalliSense AI

## AI-Driven Alloy Optimization & Industrial Monitoring System

MetalliSense AI is an intelligent decision-support platform designed for modern foundries. It analyzes spectrometer data, detects anomalies in metal composition, and recommends alloy corrections using machine learning and AI agents.

The system integrates **real-time industrial data processing**, **AI recommendation engines**, and an **interactive dashboard** to help metallurgists optimize alloy composition safely and efficiently.

---

# System Architecture

```text
Frontend (React Dashboard)
        │
        ▼
Node.js Backend API
        │
        ├── AI Model Service (FastAPI)
        │       │
        │       ├── Alloy Recommendation Model
        │       └── Anomaly Detection Model
        │
        └── AI Agent Service
```
---

# Ports Used

| Service | Port |
|-------|------|
| Frontend | 5173 / 3000 |
| Backend API | 3000 |
| AI Model API | 8000 |
| AI Agent | 8001 |

---

# Project Structure

```text
MetalliSense
│
├── frontend # React dashboard
├── backend # Node.js API server
├── Metallisense-AI # AI model service
├── ai-agent # AI reasoning agent
│
├── README.md
└── .env.example

```
---

# Prerequisites

Install the following before running the project:

- Node.js (v18+)
- Python (3.9+)
- npm
- pip
- MongoDB Atlas or local MongoDB

---

# Installation

## Clone the repository:

```bash
git clone <repository-url>
cd MetalliSense
```
# Backend Setup (Node.js)

Navigate to backend:
```bash
cd MetalliSense_Backend
```
# Install dependencies:
```bash
npm install
```
## Create environment file:
```bash
copy .env.example .env
```
## Start backend server:
```bash
npm run dev
```
## Backend runs at:

   http://localhost:3000
   
# Frontend Setup (React)

## Navigate to frontend:
```bash
cd MetalliSense_Frontend
```
## Install dependencies:
```bash
npm install
```
## Create environment file:
```bash
copy .env.example .env
```
## Start frontend:
```bash
npm start
```
## Frontend runs at:

http://localhost:5173
# AI Model Service Setup
## Read the setup.bat file in the folder
## Navigate to AI service:
```bash
cd MetalliSense_AI
```
## Create virtual environment:
```bash
python -m venv venv
```
## Activate environment (Windows):
```bash
venv\Scripts\activate
```
## Install dependencies:
```bash
pip install -r requirements.txt
```
## Train AI Models

Before starting the API, train the models:
```bash
python app/training/train_alloy_agent.py
```
This generates trained models used by the API.

## Start AI Model API
```bash
uvicorn app.main:app --reload --port 8000
```
## API documentation:

http://localhost:8000/docs
# AI Agent Setup
## Read the setup.bat file in the folder
## Navigate to agent folder:
```bash
cd MetalliSense_Agent
```
## Install dependencies:
```bash
pip install -r requirements.txt
```
## Start agent:
```bash
python agent.py
```
## Agent runs on:

http://localhost:8001
Running the Full System

## Start services in this order:

Train AI models

Start AI Model API (8000)

Start AI Agent (8001)

Start Backend API (3000)

Start Frontend (5173)

Environment Variables

# Example .env configuration for backend:

NODE_ENV=development
PORT=3000

DATABASE=mongodb+srv://<username>:<password>@cluster.mongodb.net/MetalliSense

AI_SERVICE_INDIVIDUAL_URL=http://localhost:8000
AI_SERVICE_AGENT_URL=http://localhost:8001

# Features

Real-time alloy composition monitoring

AI-based alloy correction recommendations

Anomaly detection in metal composition

AI agent assistance for metallurgists

Human-in-the-loop decision workflow

Complete traceability of recommendations

Modular microservice architecture

# Technologies Used
## Frontend

React.js

JavaScript

TailwindCSS

## Backend

Node.js

Express.js

MongoDB

## AI Model Service

Python

FastAPI

Scikit-learn

Pandas

NumPy

## AI Agent

Python

LLM APIs

Gemini API

Cloud & Tools

Firebase Authentication

MongoDB Atlas

GitHub

API Endpoints
Alloy Recommendation
POST /alloy/recommend
Anomaly Detection
POST /anomaly/predict
Troubleshooting
AI Service 503 Error

# Train models first:

python app/training/train_alloy_agent.py

Restart the AI API.

Database Connection Error

Check the .env database connection string.

Frontend Cannot Reach Backend

Verify backend is running on port 3000.

Future Improvements

Real spectrometer hardware integration

Advanced machine learning models

Cost optimization for alloy additions

Digital twin for foundry process simulation

Integration with ERP systems

# License

This project is developed for research and educational purposes.
