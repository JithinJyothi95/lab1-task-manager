# Task Manager - Docker Compose Assignment

This project demonstrates how to use Docker Compose with a multi-service architecture including:
- ReactJS frontend (3 replicas with NGINX load balancing)
- NodeJS backend (3 replicas)
- MySQL + phpMyAdmin
- PostgreSQL + pgAdmin

---

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com/)
- (Optional) GitHub Codespaces

---

## Environment Variables

Set in `.env`:

```
# MySQL
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=mytasksdb
MYSQL_USER=myuser
MYSQL_PASSWORD=myuserpass

# PostgreSQL
POSTGRES_USER=pguser
POSTGRES_PASSWORD=pgpass
POSTGRES_DB=pgdb

# pgAdmin
PGADMIN_DEFAULT_EMAIL=jithin@email.com
PGADMIN_DEFAULT_PASSWORD=jithinpass
```

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/JithinJyothi95/lab1-task-manager.git
cd lab1-task-manager

# Step 1: Start MySQL, phpMyAdmin, backend, frontend, nginx
docker-compose up -d

# Step 2: Start PostgreSQL and pgAdmin from subdirectory
cd postgres-pgadmin
docker-compose up -d
```

- Access Task Manager: [http://localhost:3001](http://localhost:3001)
- Access phpMyAdmin: [http://localhost:8081](http://localhost:8081)
- Access pgAdmin: [http://localhost:8080](http://localhost:8080)

---

## Running in GitHub Codespaces

```bash
# Inside Codespace terminal:
cd lab1-task-manager
docker-compose up -d

cd postgres-pgadmin
docker-compose up -d
```

Then visit the forwarded ports:
- Frontend: `3001-<your-id>.preview.app.github.dev`
- phpMyAdmin: `8081-<your-id>.preview.app.github.dev`
- pgAdmin: `8080-<your-id>.preview.app.github.dev`

Use `curl http://localhost:3001/api/tasks` in terminal to test backend.

---

## Screenshots

All screenshots are located in the `screenshots/` folder to demonstrate:
- Running containers (`docker ps`, Docker Desktop)
- Frontend & Backend working via browser
- phpMyAdmin showing MySQL table updates
- pgAdmin 4 running inside Codespaces

---

## File Structure Overview

```
lab1-task-manager/
├── backend/
├── frontend/
├── nginx/
├── postgres-pgadmin/
├── screenshots/
├── .env
├── docker-compose.yml
└── README.md
```

---

## Notes
- The frontend and backend both use multi-stage Docker builds.
- Three replicas each of frontend and backend are load-balanced by NGINX.
- Data is persistent for MySQL using Docker volumes.
- PostgreSQL runs in a separate compose file (`postgres-pgadmin/docker-compose.yml`).