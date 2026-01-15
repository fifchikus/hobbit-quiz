# Admin Panel Setup Guide

## Quick Start

### 1. Backend Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and set:
# - ADMIN_PASSWORD: Your secure password
# - ADMIN_TOKEN: Your secure token (optional but recommended)
# - DATABASE_URL: Your Postgres connection string
# - PORT: Server port (default: 3001)

# Start the server
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

### 2. Frontend Setup

The frontend is already configured. Just make sure the backend is running on port 3001 (or update the proxy in `vite.config.ts`).

```bash
# From project root
npm run dev
```

### 3. Access Admin Panel

1. Open `http://localhost:8080/admin`
2. Enter your admin password (and optionally token)
3. Click "Login"

## Environment Variables

Required in `server/.env`:

```env
ADMIN_PASSWORD=your-secure-password-here
ADMIN_TOKEN=your-secure-token-here
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3001
```

## Database Table Structure

Ensure your Postgres database has the `hobbit_quiz_events` table:

```sql
CREATE TABLE hobbit_quiz_events (
  id SERIAL PRIMARY KEY,
  player_id TEXT NOT NULL,
  hobbit_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## API Endpoints

All endpoints require authentication (Basic Auth or x-admin-token header):

- `GET /api/admin/events` - Fetch all events (optional `?playerId=...` query param)
- `PATCH /api/admin/events/:id` - Update event (body: `{ hobbitName?, eventType? }`)
- `DELETE /api/admin/events/:id` - Delete event

## Features

- ✅ View all events in a sortable table
- ✅ Edit hobbit names and event types
- ✅ Delete events with confirmation
- ✅ Secure authentication
- ✅ Auto-refresh capability
- ✅ Error handling and loading states
