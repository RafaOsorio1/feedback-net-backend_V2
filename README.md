# 🚀 Feedback System - Backend API

Welcome to the **Feedback System Backend**! A high-performance, scalable API designed to manage customer feedback, requests, and insights for ISPs. Built with a modern tech stack and optimized for seamless deployment.

---

## 🛠 Tech Stack

We use a premium selection of technologies to ensure stability, speed, and developer happiness:

- **Runtime:** [Node.js 20+](https://nodejs.org/) 🟢
- **Language:** [TypeScript](https://www.typescriptlang.org/) 💙 (Type-safe and robust)
- **Framework:** [Express.js](https://expressjs.com/) ⚡ (Fast and minimalist)
- **Database:** [PostgreSQL](https://www.postgresql.org/) 🐘 (Reliable relational data)
- **ORM:** [Prisma](https://www.prisma.io/) 💎 (Type-safe database access)
- **Validation:** [Zod](https://zod.dev/) ✅ (Schema validation)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) 🔐
- **Storage:** [Cloudinary](https://cloudinary.com/) ☁️ (Media management)
- **Containerization:** [Docker](https://www.docker.com/) 🐳 & [Docker Compose](https://docs.docker.com/compose/)
- **Logging:** [Winston](https://github.com/winstonjs/winston) 📝

---

## ✨ Features

- 👤 **ISP & Employee Management:** Multi-level authentication and role-based access control.
- 📩 **Request Handling:** Manage customer petitions, complaints, and suggestions.
- 💬 **Dynamic Responses:** Full message history between ISPs and customers.
- 📊 **Analytics Dashboard:** Metrics on response times and request statuses.
- 🖼 **Media Support:** Direct image uploads to Cloudinary.
- 🐳 **Full Dockerization:** One-command setup for development and production.

---

## 🚦 Getting Started

### 📋 Prerequisites

- **Node.js 20** or higher.
- **PNPM** (recommended) or NPM.
- **Docker** and **Docker Compose** installed.

### ⚙️ Installation & Configuration

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd feedback-backend
   ```

2. **Setup environment variables:**

   ```bash
   cp .env.example .env
   ```

   > 💡 _Don't forget to fill in your `DATABASE_URL`, `JWT_KEY`, and `CLOUDINARY` credentials!_

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

---

## 👨‍💻 Development

### 1. Fire up the Database 🐘

We recommend using Docker for your local PostgreSQL instance:

```bash
docker-compose up -d db
```

### 2. Run in Dev Mode ⚡

```bash
pnpm dev
```

The server will start at `http://localhost:3111`.

---

## 🗄 Database Management (Prisma)

Keep your database synced and populated with these easy commands:

- 🏗 **Create Migrations:** `npx prisma migrate dev`
- ✨ **Generate Client:** `pnpm postinstall`
- 🌱 **Seed Database:** `pnpm prisma:seed`
- 🖥 **Studio (GUI):** `npx prisma studio`

---

## 🚢 Production & Deployment

### Build & Start Traditional

```bash
pnpm build
pnpm start
```

### Build with Docker 🐳

Run the entire stack (API + DB) with one command:

```bash
docker-compose up --build
```

---

## 📁 Project Structure

```text
src/
 ├── app/           # Express application & server config
 ├── config/        # Environment & 3rd party configs
 ├── controllers/   # Request handling logic
 ├── libs/          # Reusable libraries (JWT, Database, Hash)
 ├── middlewares/   # Custom Express middlewares
 ├── routes/        # API route definitions
 ├── useCases/      # Business logic entry points
 └── utils/         # Helper functions
prisma/             # Database schema & migrations
```

---

## 🛡 License

This project is licensed under the **ISC License**.

Developed with ❤️ by the Feedback Team.
