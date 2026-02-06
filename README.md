# Whisper - Modern Chat Application

A full-stack, real-time chat application built with TypeScript, featuring a scalable backend, responsive web interface, and cross-platform mobile app.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Real-time Communication](#real-time-communication)
- [Development](#development)
- [Contributing](#contributing)
- [Project Status](#project-status)

## 🎯 Overview

Whisper is a comprehensive chat application designed with modern architecture principles. It provides users with the ability to create chats, exchange messages in real-time, and manage their user profiles across web and mobile platforms. The application leverages WebSocket technology for instant message delivery and Clerk for secure authentication.

## ✨ Features

### Core Features
- **Real-time Messaging**: Instant message delivery using WebSocket (Socket.io)
- **User Authentication**: Secure authentication powered by Clerk
- **Chat Management**: Create, manage, and organize multiple conversations
- **User Profiles**: Manage user information and settings
- **Message History**: Persistent message storage with retrieval capabilities
- **Cross-platform Support**: Web and mobile (iOS/Android) interfaces

### Technical Features
- **TypeScript**: Type-safe codebase across all services
- **Responsive Design**: Mobile-first web interface
- **Database**: MongoDB with Object Data Modeling (Mongoose)
- **Real-time Updates**: Socket.io for live notifications
- **Error Handling**: Comprehensive error handling middleware
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠 Tech Stack

### Backend
- **Runtime**: Bun (JavaScript/TypeScript runtime)
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.1.5
- **Authentication**: Clerk (@clerk/express)
- **Real-time**: Socket.io 4.8.3
- **Language**: TypeScript 5.x
- **CORS**: cors 2.8.6

### Web Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Language**: TypeScript
- **Authentication**: Clerk React (@clerk/clerk-react 5.60.0)
- **Styling**: CSS
- **Package Manager**: npm

### Mobile
- **Framework**: React Native 0.81.5 + Expo 54.0.32
- **Router**: Expo Router 6.0.22
- **Language**: TypeScript
- **Navigation**: React Navigation
- **Icons**: Expo Vector Icons
- **Animations**: React Native Reanimated 4.1.1
- **Package Manager**: npm

## 📁 Project Structure

```
whisper/
├── backend/                 # Express.js server
│   ├── src/
│   │   ├── app.ts          # Express app configuration
│   │   ├── config/
│   │   │   └── database.ts  # MongoDB connection
│   │   ├── controller/      # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── chatController.ts
│   │   │   ├── messageController.ts
│   │   │   └── userController.ts
│   │   ├── middleware/      # Custom middleware
│   │   │   ├── auth.ts      # Authentication middleware
│   │   │   └── errorHandler.ts
│   │   ├── model/           # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── chat.ts
│   │   │   └── message.ts
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.ts
│   │   │   ├── chatRoutes.ts
│   │   │   ├── messageRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── scripts/
│   │   │   └── seed.ts      # Database seeding
│   │   └── utils/
│   │       └── socket.ts    # WebSocket utilities
│   ├── index.ts             # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── web/                     # React web application
│   ├── src/
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   ├── App.css
│   │   ├── index.css
│   │   └── assets/          # Static assets
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── eslint.config.js
│   └── README.md
│
├── mobile/                  # React Native app
│   ├── app/                 # Expo Router app directory
│   │   ├── _layout.tsx      # Root layout
│   │   ├── modal.tsx
│   │   └── (tabs)/          # Tab navigation
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       └── explore.tsx
│   ├── components/          # Reusable components
│   │   ├── ui/
│   │   ├── themed-text.tsx
│   │   ├── themed-view.tsx
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   ├── scripts/
│   ├── constants/
│   ├── assets/
│   ├── app.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── README.md                # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **npm** or **bun** package manager
- **MongoDB** instance (local or cloud-based, e.g., MongoDB Atlas)
- **Git** for version control

### Getting Started Checklist
- [ ] Set up MongoDB (obtain connection string)
- [ ] Create Clerk application (get API keys)
- [ ] Configure environment variables
- [ ] Install dependencies for each service

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd whisper
```

### Step 2: Set Up Environment Variables

Create `.env` files in the backend directory with your configuration:

#### Backend `.env`
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/whisper
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MOBILE_URL=your_mobile_app_url
```

#### Web Frontend `.env`
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3001
```

#### Mobile `app.json`
```json
{
  "expo": {
    "extra": {
      "clerkPublishableKey": "your_clerk_publishable_key",
      "apiUrl": "http://localhost:3001"
    }
  }
}
```

### Step 3: Install Dependencies

#### Backend
```bash
cd backend
bun install
# or
npm install
```

#### Web
```bash
cd web
npm install
```

#### Mobile
```bash
cd mobile
npm install
```

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
bun run dev
# or
npm run dev
```
Server runs on `http://localhost:3001`

Health check: http://localhost:3001/health

### Start Web Application
```bash
cd web
npm run dev
```
Application accessible at `http://localhost:5173`

### Start Mobile Application
```bash
cd mobile
npm start
```
Then press:
- `i` for iOS
- `a` for Android
- `w` for web

### Run All Services (from root)

You can set up a root `package.json` with concurrently to run all services:

```bash
npm run dev  # runs all services in parallel
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Authentication Routes
```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
POST   /api/auth/logout          - Logout user
GET    /api/auth/me              - Get current user
```

### User Routes
```
GET    /api/users                - Get all users
GET    /api/users/:id            - Get user by ID
PUT    /api/users/:id            - Update user profile
DELETE /api/users/:id            - Delete user
GET    /api/users/:id/chats      - Get user's chats
```

### Chat Routes
```
GET    /api/chat                 - Get all chats for user
POST   /api/chat                 - Create new chat
GET    /api/chat/:id             - Get chat details
PUT    /api/chat/:id             - Update chat
DELETE /api/chat/:id             - Delete chat
POST   /api/chat/:id/members     - Add member to chat
DELETE /api/chat/:id/members/:userId - Remove member from chat
```

### Message Routes
```
GET    /api/message/:chatId      - Get messages for chat
POST   /api/message              - Send message
PUT    /api/message/:id          - Edit message
DELETE /api/message/:id          - Delete message
```

### Health Check
```
GET    /health                   - Server health status
```

## 🗄️ Database Models

### User Schema
```typescript
{
  _id: ObjectId
  clerkId: String (unique, indexed)
  email: String (unique, indexed)
  username: String
  firstName: String
  lastName: String
  profileImage: String
  status: String (online/offline/away)
  createdAt: Date
  updatedAt: Date
}
```

### Chat Schema
```typescript
{
  _id: ObjectId
  name: String
  description: String
  members: [ObjectId] (references User)
  createdBy: ObjectId (reference to User)
  isGroupChat: Boolean
  lastMessage: ObjectId (reference to Message)
  createdAt: Date
  updatedAt: Date
}
```

### Message Schema
```typescript
{
  _id: ObjectId
  chatId: ObjectId (reference to Chat)
  sender: ObjectId (reference to User)
  content: String
  attachments: [String] (URLs)
  isEdited: Boolean
  editedAt: Date
  reactions: [{
    emoji: String,
    users: [ObjectId]
  }]
  createdAt: Date
  updatedAt: Date
}
```

## 🔐 Authentication

The application uses **Clerk** for secure authentication:

- Social login support (Google, GitHub, etc.)
- Email/password authentication
- Session management
- JWT token handling
- Embedded authentication in clients

### Authentication Flow
1. User authenticates via Clerk in the web/mobile app
2. Clerk provides JWT token and user information
3. Token sent with API requests to backend
4. Backend validates token using Clerk middleware
5. Requests proceed if authenticated

## ⚡ Real-time Communication

### WebSocket Events (Socket.io)

**Client → Server**
```javascript
socket.emit('message:send', { chatId, content })
socket.emit('user:typing', { chatId })
socket.emit('user:online')
socket.emit('user:offline')
```

**Server → Client**
```javascript
socket.on('message:received', (message))
socket.on('user:typing', (userData))
socket.on('user:status:changed', (userData))
socket.on('message:updated', (message))
socket.on('message:deleted', (messageId))
```

## 🔧 Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Consistent naming conventions

### Development Workflow
1. Create feature branch
2. Make changes
3. Run linters: `npm run lint`
4. Test locally
5. Commit with clear messages
6. Push and create pull request

### Testing
```bash
# Backend
cd backend
npm test

# Web
cd web
npm test

# Mobile
cd mobile
npm test
```

(Set up as needed based on testing framework)

## 📝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Process
- Ensure tests pass
- Maintain TypeScript type safety
- Follow project conventions
- Document new features

## 📊 Project Status

- ✅ Backend API setup
- ✅ Database models configured
- ✅ Authentication integration
- 🔄 Real-time messaging implementation
- 🔄 Web UI development
- 🔄 Mobile UI development
- ⏳ Testing suite
- ⏳ Deployment configuration

## 📞 Support

For issues or questions:
1. Check existing GitHub issues
2. Read documentation in respective `README.md` files
3. Create a new issue with detailed description

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.com) - Authentication
- [Mongoose](https://mongoosejs.com) - MongoDB ODM
- [Socket.io](https://socket.io) - Real-time communication
- [Expo](https://expo.dev) - Mobile development
- [Vite](https://vitejs.dev) - Frontend build tool
- [Bun](https://bun.com) - JavaScript runtime

---

**Last Updated**: February 2026
**Version**: 1.0.0 (Development)
