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

3. Update config.py inside app/core/ with your DB config and secret keys.

4. Initialize Alembic:
    ```bash
    alembic init alembic
5. add models , and database Url and metadata to alemmbic

6. Generate migration:
    ```bash
    alembic revision --autogenerate -m "init" 

7. Apply migration:
    ```bash
    alebic upgrade head

8. Insert default task statuses and priorities:
    . Generate migration:
        ```bash
        alembic revision --autogenerate -m "initailization"
    . update upgrade function
        - at alembic/versions find file name initailization.py then replace upgrade function and add these import :
            from sqlalchemy.sql import column,table
            from sqlalchemy import Integer,String
            def upgrade() -> None:
                task_status_table = table(
                    "task_statuses", 
                    column("id", Integer),
                    column("status", String)
                )
                task_priority_table = table(
                    "task_priority",
                    column("id",Integer),
                    column("priority",String)

                )
                
                op.bulk_insert(task_status_table, [
                    {"id":1 ,"status": "Pending"},
                    {"id":2,"status": "In Progress"},
                    {"id":3,"status": "Completed"}
                ])
                op.bulk_insert(task_priority_table,[
                    {"id":1,"priority":"Low"},
                    {"id":2,"priority":"Meduim"},
                    {"id":3,"priority":"High"},
                ])
    . Apply migration:
        ```bash
        alembic upgrade head
9. Run you backend server:
    - navigate to backend/app/
    - run:
        ```bash
        uvicorn main:app --reload

🌐 Frontend Setup
1. Navigate to the frontend directory.
2. Install dependencies:
    ```bash
    npm install
3. Run the development server:
    ```bash
    npm run dev

🔍 API documentation available at:
http://localhost:8000/docs (Swagger UI)

📌 Upcoming Features

. Task due dates and reminders

. Pagination and filtering

. Drag and drop task sorting

. Export tasks to CSV/PDF

