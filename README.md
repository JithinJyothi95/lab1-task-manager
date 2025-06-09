# Docker Compose Task Manager Setup

This project demonstrates a full-stack task manager application using **Docker Compose** with the following services:

- MySQL (with persistent volume)
- PHPMyAdmin (MySQL GUI)
- Node.js backend API (multi-stage build, 3 replicas)
- React frontend UI (multi-stage build, 3 replicas)
- NGINX reverse proxy
- PostgreSQL + pgAdmin4

---

## Prerequisites

- Docker and Docker Compose installed
- Internet connection to pull images

## Clone This Repository

```bash
git clone https://github.com/JithinJyothi95/lab1-task-manager.git
cd lab1-task-manager
```

## Environment Configuration

Create a `.env` file in the root directory with the following contents:

```env
# MySQL Configuration
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=mytasksdb
MYSQL_USER=myuser
MYSQL_PASSWORD=myuserpass

# PostgreSQL Configuration
POSTGRES_USER=pguser
POSTGRES_PASSWORD=pgpass
POSTGRES_DB=pgdb
PGADMIN_DEFAULT_EMAIL=jithin@email.com
PGADMIN_DEFAULT_PASSWORD=jithinpass
```

---

## Running the Application

```bash
docker-compose up -d --build
```

All services will be built and launched. Data volumes ensure persistence.

---

## Access Services in Browser

| Service        | URL                     |
|----------------|--------------------------|
| Task Frontend  | http://localhost:3001    |
| Backend API    | http://localhost:3001/api/tasks |
| PHPMyAdmin     | http://localhost:8081    |
| pgAdmin4       | http://localhost:8080    |

---

## Notes

- **3 replicas** of both frontend and backend are defined in `docker-compose.yml`
- **Multi-stage builds** are used for both Node.js and React apps
- **Nginx** handles reverse proxy for frontend/backend
- All credentials are managed via `.env`


---
## Required Screenshots
- Include the following in your `screenshots/` folder:
- All containers running (docker ps, Docker Desktop)
- App accessible via localhost:3001
- API output GET /api/tasks
- phpMyAdmin with mytasksdb and tasks table
- pgAdmin connected to PostgreSQL
- Screenshot showing load-balanced backend replicas

---
## Stopping Services

```bash
docker-compose down
```

To also remove volumes:

```bash
docker-compose down -v
```

---

## Author

Jithin Jyothi - Lab 1