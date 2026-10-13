# 🚀 Kodex_mini — Multi-Agent AI Assistant

Kodex_mini is a multi-agent AI assistant built using the **MERN stack, LangChain, and LangGraph**. It routes user requests to specialized AI agents, allowing users to chat, perform search-related tasks, get coding assistance, and generate PDF documents through a unified interface.

The project combines AI orchestration with a microservices architecture, authentication, conversation persistence, and file storage.

## ✨ Features

- 💬 **AI Chat** — Interact with an AI assistant through a conversational interface.
- 🔎 **Search Agent** — Handle search-related requests.
- 💻 **Coding Agent** — Get assistance with programming and code-related tasks.
- 📄 **PDF Agent** — Generate structured PDF documents using AI.
- 🧠 **Conversation History** — Persist conversations and messages in MongoDB.
- 🔐 **Authentication** — User authentication using Firebase.
- 🗄️ **Database** — Store users, conversations, and messages with MongoDB.
- ⚛️ **Modern Frontend** — React, Redux Toolkit, and Tailwind CSS.
- 🏗️ **Microservices Architecture** — Separate services for authentication, chat, AI agents, and API routing.
- ☁️ **Cloud File Storage** — Store generated PDFs using Supabase Storage.
- 🐳 **Docker Support** — Docker and Docker Compose configuration for containerization and local development.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React, Redux Toolkit, Tailwind CSS, Vite |
| Backend | Node.js, Express.js |
| AI Orchestration | LangChain, LangGraph |
| LLM Integration | Groq |
| Database | MongoDB, Mongoose |
| Authentication | Firebase |
| File Storage | Supabase Storage |
| API Communication | REST APIs, API Gateway |
| Containerization | Docker, Docker Compose |

## 🧠 How It Works

Kodex_mini uses LangGraph to route requests to the appropriate AI agent.

```text
                     User
                       |
                       v
                React Frontend
                       |
                       v
                  API Gateway
                       |
                       v
                 Agent Service
                       |
                       v
                 LangGraph Router
                       |
          +------------+------------+
          |            |            |
          v            v            v
        Chat         Search       Coding
          |
          +-------------------------+
                       |
                       v
                   PDF Agent
                       |
                       v
                 AI Response
                       |
             +---------+---------+
             |                   |
             v                   v
           React             MongoDB

       Generated PDF files
               |
               v
        Supabase Storage
```

### Request flow

1. The user sends a message through the React frontend.
2. The API Gateway forwards the request to the appropriate backend service.
3. The Agent Service uses LangGraph to route the request to the selected agent.
4. The selected agent processes the request using the configured LLM or other required services.
5. The response is returned to the frontend.
6. Conversations and messages are persisted in MongoDB, and generated PDFs are stored in Supabase Storage.

*Note: The diagram is a high-level overview. Exact routing and persistence behavior depend on the selected agent and request flow.*

## 🏗️ Project Structure

```text
Kodex_mini/
│
├── client/                     # React frontend
│
├── server/
│   ├── gateway/                # API Gateway
│   │
│   ├── services/
│   │   ├── auth/               # Authentication service
│   │   ├── chat/               # Chat and conversation service
│   │   └── agent/              # LangGraph and AI agents
│   │
│   └── shared/                 # Shared backend utilities
│
├── .gitignore
├── docker-compose.yml
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- MongoDB or a MongoDB Atlas cluster
- Docker and Docker Compose, if using the containerized setup

You'll also need the relevant credentials for Firebase, your configured LLM provider, and Supabase Storage.

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Kodex_mini
```

Replace the placeholder with your actual GitHub repository URL.

### 2. Install dependencies

Install dependencies in each application or service directory that contains its own `package.json`.

For example:

```bash
cd client
npm install
```

Repeat for the Gateway and each backend service:

```text
server/gateway/
server/services/auth/
server/services/chat/
server/services/agent/
```

Run these commands from the respective directories.

### 3. Configure environment variables

Create a separate `.env` file in each service directory, according to the variables that service uses.

Typical configuration may include:

```env
PORT=your_service_port
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=your_frontend_url
```

The Gateway may also need service URLs such as:

```env
AUTH_SERVICE_URL=your_auth_service_url
CHAT_SERVICE_URL=your_chat_service_url
AGENT_SERVICE_URL=your_agent_service_url
```

The Agent Service may require:

```env
GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
SUPABASE_PDF_BUCKET=generated-pdfs
```

Configure Firebase credentials according to your Firebase initialization code.

**Important:** These are example variable names, not a complete guaranteed configuration. Check each service's source code and existing environment configuration to identify all required variables. Use the correct port and variable names for your application.

Never commit `.env` files, private keys, database passwords, or API secrets to GitHub. Add `.env.example` files containing placeholders instead.

### 4. Run the application locally

Start each backend service using its configured development script, then start the frontend.

For the frontend:

```bash
cd client
npm run dev
```

For a backend service, use its configured script, for example:

```bash
npm run dev
```

Run each command from the relevant directory. Ensure MongoDB, Redis (if required), Firebase credentials, and the necessary AI and storage services are configured before testing the application.

### 5. Docker

A `docker-compose.yml` file is included for the containerized setup.

To start the services:

```bash
docker compose up --build
```

Ensure the Compose configuration, environment variables, ports, and service dependencies are configured for your environment before running this command.

## 🗺️ Roadmap

Planned improvements include:

- 🖼️ **Vision Agent** — Add image understanding and image-related tasks.
- 📊 **PowerPoint Agent** — Generate presentation slides using AI.
- 🚀 **Production Deployment** — Complete deployment and production configuration.
- ⚡ **Further Improvements** — Improve agent workflows, reliability, and user experience.

## 🔒 Security

- Keep API keys and private credentials in environment variables or a secure secrets manager.
- Never expose Firebase Admin service-account credentials in frontend code.
- Never commit MongoDB credentials or Supabase secret keys.
- Validate and authenticate requests to protected API routes.
- Use HTTPS and configure CORS for the intended frontend origin in production.

## 📌 Project Status

**Current status:** Core Chat, Search, Coding, and PDF functionality has been implemented. Deployment and production configuration are in progress. Vision and PowerPoint agents are planned for future development.

## 👨‍💻 About

Kodex_mini is a hands-on project exploring full-stack development, AI agent orchestration, backend microservices, authentication, and AI-powered document generation.

Built to learn, experiment, and explore how specialized AI agents can work together in a single application.

