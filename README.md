# Kodex_mini

Kodex_mini is a multi-agent AI assistant built using the MERN stack and LangGraph.

It can handle different types of tasks by routing the user's request to the appropriate AI agent.

## 🚀 Features

- 💬 AI Chat
- 🔎 Web Search Agent
- 💻 Coding Agent
- 📄 PDF Agent
- 🧠 Conversation Memory
- 🔐 Firebase Authentication
- 🗄️ MongoDB for data storage
- ⚛️ React + Redux frontend
- 🐳 Docker support

## 🚀 Upcoming Features

- 🖼️ Vision Agent
- 📊 PowerPoint Agent

## 🧠 How It Works

The user sends a message and selects an agent.

```text
User
  ↓
React Frontend
  ↓
API Gateway
  ↓
LangGraph Router
  ↓
┌─────────┬─────────┬──────────┬────────┬────────┐
│  Chat   │ Search  │  Coding  │  PDF   │ Vision │
└─────────┴─────────┴──────────┴────────┴────────┘
  ↓
AI Response
  ↓
MongoDB
  ↓
Frontend



Kodex_mini/
│
├── client/                 # React frontend
│
├── server/
│   ├── gateway/            # API Gateway
│   ├── services/
│   │   ├── auth/           # Authentication service
│   │   ├── chat/           # Chat and conversation service
│   │   └── agent/          # LangGraph AI agents
│   │
│   └── shared/             # Shared backend utilities
│
├── .gitignore
├── docker-compose.yml
└── README.md
