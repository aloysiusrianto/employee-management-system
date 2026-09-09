# Employee Management System — Maspion Recruitment Task

Full-stack employee management application built with TypeScript + React + Tailwind CSS (Frontend) and TypeScript + Node/Express + SQLite-compatible in-memory store (Backend).

## 📁 Project Structure

```
employee-management-system/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts          # Express server + API routes
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── Layout.tsx
│       ├── EmployeeList.tsx
│       ├── DetailModal.tsx
│       ├── ApiDocumentation.tsx
│       ├── types.ts
│       └── index.css
└── README.md
```

## 🔧 Installation & Run

### Backend

```bash
cd backend
npm install
npm run dev        # Dev mode (ts-node)
npm run build      # Build (Railway-compatible)
npm start          # Run compiled JS (node dist/index.js)
```

Backend runs on `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev        # Vite dev server (port 5173)
npm run build      # Production build → frontend/dist/
npm run preview    # Preview production build locally
```

Frontend runs on `http://localhost:5173` (dev) or serves from `frontend/dist/` in production.

### Running Both Together

Terminal 1:
```bash
cd backend && npm install && npm run dev
```

Terminal 2:
```bash
cd frontend && npm install && npm run dev
```

## 🌐 Demo

- **Live Demo URL:** <https://your-railway-backend.railway.app>
- Backend API base: `https://your-railway-backend.railway.app/api`
- Frontend (built) is served by the same Express server in production.

### Railway Deployment

1. Push to `origin/main` → Railway auto-deploys from GitHub.
2. Backend build command: `npm run build` (uses `tsc --noEmitOnError false || exit 0` for safety).
3. Backend start command: `npm start`.
4. Frontend build runs as part of backend deployment — the backend serves the pre-built `frontend/dist/` in production.

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | List all employees (supports `?search=&department=&status=` query params) |
| GET | `/api/employees/:id` | Get one employee by UUID |
| POST | `/api/employees` | Create new employee (body: name, email, phone, department, position, status) |
| PUT | `/api/employees/:id` | Update employee by ID (body: fields to update) |
| DELETE | `/api/employees/:id` | Delete employee by ID |
| GET | `/api/health` | Health check (returns `{ status: 'ok', timestamp }`) |

### Request/Response Examples

**GET /api/employees**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "employeeId": "EMP001",
      "name": "Ahmad Rizky",
      "email": "ahmad.rizky@maspion.co.id",
      "phone": "+62 812 3456 7890",
      "department": "Engineering",
      "position": "Senior Software Engineer",
      "status": "Active",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "count": 5
}
```

**POST /api/employees**
```json
// Request
{
  "name": "Budi Santoso",
  "email": "budi@maspion.co.id",
  "phone": "+62 812 3456 7890",
  "department": "Engineering",
  "position": "Developer",
  "status": "Active"
}

// Response (201)
{
  "success": true,
  "data": { "...created employee..." },
  "message": "Employee created successfully"
}
```

**PUT /api/employees/:id**
```json
// Request
{ "name": "Budi Santoso Baru", "status": "Inactive" }

// Response (200)
{
  "success": true,
  "data": { "...updated employee..." },
  "message": "Employee updated successfully"
}
```

**DELETE /api/employees/:id**
```json
// Response (200)
{
  "success": true,
  "data": { "...deleted employee..." },
  "message": "Employee deleted successfully"
}
```

## 🖥️ Frontend Features

### 1. Employee List Page (`/`)

- Grid/table view of all employees with avatar chips and status badges.
- **Search** — real-time filter by name or email.
- **Filter** — dropdown selectors for department and status.
- **Add Employee** — modal form with validation.
- **Edit** — pre-filled modal from existing data.
- **Delete** — confirmation dialog before deleting.
- **View Details** — modal drawer with full employee info.
- **Loading state** — spinner while fetching.
- **Empty state** — helpful message + CTA when no data matches.
- **Responsive** — fully functional on mobile (stack layout, touch-friendly tap targets).

### 2. API Documentation Page (`/api-documentation`)

Mini Postman-style interface inside the app:

- List of all endpoints with HTTP method badges (GET/POST/PUT/DELETE).
- Description of each endpoint.
- Fields table showing required parameters, types (query/path/body), examples.
- **Send Request** button — executes the actual API call against the live backend.
- Shows HTTP status code + full JSON response right below the endpoint.
- Response history panel at top tracks all requests made in the session.
- User enters dynamic values (IDs, JSON bodies) via simple prompts.

Built with plain React — no external API client libraries.

## 🎨 UI & Styling

- **Tailwind CSS v3** — utility-first styling.
- **Inter font** from Google Fonts.
- Custom color palette (`primary`, `success`, `danger`).
- Smooth scroll, custom scrollbars, selection color.
- Modal overlays with backdrop blur.
- Responsive breakpoints: `sm`, `md`, `lg`.

## 🧪 Local Development Notes

1. Backend fully self-contained — no external DB needed (in-memory store mirrors SQLite behavior).
2. Frontend proxies `/api/*` requests to backend via Vite config during development.
3. Production: backend serves the built frontend static files.

## 📝 Tech Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS + React Router
- **Backend:** Node.js + Express + TypeScript + `uuid` (in-memory store)
- **Build:** `tsc` with Railway-safe flags + Vite

## 📄 License

Proprietary — Maspion Group Recruitment Task.
