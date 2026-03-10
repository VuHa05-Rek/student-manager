from fastapi import FastAPI
from .database import Base, engine
from .routers import students, classes
from fastapi.middleware.cors import CORSMiddleware
# ...existing code...
# tạo database
Base.metadata.create_all(bind=engine)

app = FastAPI()

# cho phép frontend gọi API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# register router
app.include_router(students.router)
app.include_router(classes.router)