# ✅ Task Manager Web Application

A full-stack task management system built with **FastAPI** (backend) and **Next.js + Redux** (frontend).  
It allows users to create, edit, delete, and track tasks with statuses and priorities.

---

## 🛠️ Tech Stack

### 🚀 Backend:
- Python 3.12
- FastAPI
- SQLAlchemy
- MySQL (via `mysql-connector-python`)
- Alembic (for database migrations)
- Uvicorn (ASGI server)
- python-jose (JWT)
- passlib & bcrypt (Password hashing)
- validate_email
- pytz (Timezone support)

### 🎨 Frontend:
- Next.js
- Redux Toolkit
- MUI (Material UI)
- Spike Admin Template by Wrappixel

---

## 📦 Features

### 🎯 Task Features:
- ✅ Create Task
- ✏️ Edit Task
- ❌ Delete Task (single & multiple)
- 🔍 View All Tasks
- 🏷️ Assign Status (`Pending`, `In Progress`, `Completed`)
- ⚡ Set Task Priority (`Low`, `Normal`, `High`)

### 📊 Dashboard:
- 🔢 Total Tasks
- 🧾 Edited Tasks
- 🗑️ Deleted Tasks
- 📈 Tasks by Status

---

## 📁 Project Structure

project-root/
│
├── backend/
│ ├── alembic/
│ │ └── versions/
│ ├── app/
│ │ ├── db/
│ │ ├── models/
│ │ ├── routers/
| | |__ schemas/
│ │ ├── services/
| | |__ utility/
│ │ └── main.py
│ └── requirements.txt
│
├── frontend/


---

## 🧰 Setup Instructions

### 🐍 Backend Setup

1. Clone the repo and navigate to the backend directory:
   ```bash
   git clone https://github.com/salah0533/task_manager.git
   cd backend

2. Create a virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate  # or .\venv\Scripts\activate on Windows
    pip install -r requirements.txt

3. update config.py file inside app/core/

4. initailiza alembic
    ```bash
    alembic init alembic

5. 
