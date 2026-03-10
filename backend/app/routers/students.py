from fastapi import APIRouter, Depends
from fastapi.responses import Response
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Search students by name
@router.get("/students")
def get_students(name: str = None, db: Session = Depends(get_db)):
    if name:
        return crud.search_students_by_name(db, name)
    return crud.get_students(db)

@router.post("/students")
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.create_student(db, student)

@router.put("/students/{student_id}")
def update_student(student_id: str, student: schemas.StudentBase, db: Session = Depends(get_db)):
    return crud.update_student(db, student_id, student)

@router.delete("/students/{student_id}")
def delete_student(student_id: str, db: Session = Depends(get_db)):
    return crud.delete_student(db, student_id)

# Statistics
@router.get("/students/statistics")
def get_statistics(db: Session = Depends(get_db)):
    return crud.get_student_statistics(db)

# Export CSV
@router.get("/students/export")
def export_students_csv(db: Session = Depends(get_db)):
    csv_data = crud.export_students_csv(db)
    return Response(content=csv_data, media_type="text/csv")