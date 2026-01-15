# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Admin Panel

The project includes an admin panel at `/admin` for managing Hobbit Quiz events stored in Postgres.

### Setup

1. **Install backend dependencies:**
   ```sh
   cd server
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the `server/` directory:
   ```env
   ADMIN_PASSWORD=your-secure-password-here
   ADMIN_TOKEN=your-secure-token-here
   DATABASE_URL=postgresql://user:password@host:port/database
   PORT=3001
   ```

3. **Start the backend server:**
   ```sh
   cd server
   npm run dev  # Development mode with auto-reload
   # or
   npm start    # Production mode
   ```

4. **Start the frontend:**
   ```sh
   npm run dev
   ```

### Using the Admin Panel

1. Navigate to `http://localhost:8080/admin`
2. Log in with:
   - **Admin Password**: The value from `ADMIN_PASSWORD` env var
   - **Admin Token** (optional): The value from `ADMIN_TOKEN` env var
3. Once authenticated, you can:
   - View all events in a table
   - Edit hobbit names and event types
   - Delete events
   - Refresh the event list

### Authentication

The admin panel supports two authentication methods:
- **Basic Auth**: Username `admin` with password from `ADMIN_PASSWORD`
- **Token Auth**: Header `x-admin-token` with value from `ADMIN_TOKEN`

Credentials are stored in browser localStorage after login.

### Database Schema

The admin panel expects a `hobbit_quiz_events` table with these columns:
- `id` (integer, primary key)
- `player_id` (text)
- `hobbit_name` (text)
- `event_type` (text)
- `event_timestamp` (timestamp)
- `created_at` (timestamp)
