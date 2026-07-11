# AWS Route53 Clone

A full-stack AWS Route53 Clone built using **Next.js (TypeScript)** for the frontend and **FastAPI** for the backend. The application allows users to manage Hosted Zones and DNS Records through a clean, Route53-inspired interface.

---

## Features

### Authentication
- Mock login authentication
- Session management
- Logout functionality

### Dashboard
- Overview of total Hosted Zones
- Overview of total DNS Records

### Hosted Zone Management
- Create Hosted Zones
- View Hosted Zones
- Update Hosted Zones
- Delete Hosted Zones
- Search Hosted Zones

### DNS Record Management
- Create DNS Records
- View DNS Records
- Update DNS Records
- Delete DNS Records
- Filter DNS Records by Record Type

### UI Features
- Route53-inspired layout
- Sidebar navigation
- Responsive tables
- Forms with validation
- Modal dialogs
- Search functionality
- Filters
- Pagination
- Notifications

---

# Tech Stack

## Frontend

- Next.js
- TypeScript
- React
- CSS

## Backend

- FastAPI
- SQLAlchemy
- Pydantic
- SQLite

---

## Project Structure

```text
aws-route53-clone/
│
├── backend/
│   ├── routers/
│   │   ├── auth.py
│   │   ├── hosted_zones.py
│   │   └── dns_records.py
│   │
│   ├── crud.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/
│   │   │   ├── dashboard/
│   │   │   ├── hosted-zones/
│   │   │   ├── dns-records/
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── HostedZoneTable.tsx
│   │   │   └── DNSRecordTable.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── dashboard.css
│   │   │   ├── login.css
│   │   │   ├── hostedzones.css
│   │   │   └── dnsrecords.css
│   │   │
│   │   └── types/
│   │       ├── hostedZone.ts
│   │       └── dnsRecord.ts
│   │
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

# Architecture Overview

The project follows a client-server architecture.

```
                +----------------------+
                |  Next.js Frontend    |
                |   (TypeScript)       |
                +----------+-----------+
                           |
                      REST API
                           |
                +----------v-----------+
                |      FastAPI         |
                |     Backend API      |
                +----------+-----------+
                           |
                     SQLAlchemy ORM
                           |
                +----------v-----------+
                |      SQLite DB       |
                +----------------------+
```

### Backend Layers

- Routers → API Endpoints
- CRUD → Business Logic
- Models → Database Tables
- Schemas → Request & Response Validation
- Database → SQLAlchemy Configuration

---

# Database Schema

## Hosted Zones

| Field | Type |
|------|------|
| id | Integer |
| domain_name | String |
| description | String |
| created_at | DateTime |
| updated_at | DateTime |

---

## DNS Records

| Field | Type |
|------|------|
| id | Integer |
| hosted_zone_id | Integer (Foreign Key) |
| name | String |
| type | String |
| value | String |
| ttl | Integer |

### Relationship

```
HostedZone
    |
    | 1
    |
    |------< DNSRecord
```

One Hosted Zone can contain multiple DNS Records.

---

# API Overview

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Mock Login |

---

## Hosted Zones

| Method | Endpoint |
|--------|----------|
| GET | /hosted-zones |
| GET | /hosted-zones/{id} |
| POST | /hosted-zones |
| PUT | /hosted-zones/{id} |
| DELETE | /hosted-zones/{id} |

---

## DNS Records

| Method | Endpoint |
|--------|----------|
| GET | /dns-records |
| GET | /dns-records/{id} |
| GET | /dns-records/hosted-zone/{hosted_zone_id} |
| POST | /dns-records |
| PUT | /dns-records/{id} |
| DELETE | /dns-records/{id} |

---

# Setup Instructions

## Backend

### 1. Navigate to backend

```bash
cd backend
```

### 2. Create virtual environment

```bash
python -m venv myvenv
```

### 3. Activate environment

Windows

```bash
myvenv\Scripts\activate
```

Linux/macOS

```bash
source myvenv/bin/activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Run FastAPI

```bash
uvicorn main:app --reload
```

Backend runs at

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

---

## Frontend

### 1. Navigate to frontend

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:3000
```

---

# Login Credentials

Username

```
admin
```

Password

```
admin123
```

---

# Future Improvements

- JWT Authentication
- Role-Based Access Control
- Server-side Pagination
- Advanced Search & Filters
- AWS Route53 API Integration
- Unit & Integration Testing

---

# Author

**Manjari M Varma**