from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database

router = APIRouter()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/classes")
def get_classes(db: Session = Depends(get_db)):
    return crud.get_classes(db)

@router.post("/classes")
def create_class(class_: schemas.ClassCreate, db: Session = Depends(get_db)):
    return crud.create_class(db, class_)

@router.put("/classes/{class_id}")
def update_class(class_id: str, class_: schemas.ClassBase, db: Session = Depends(get_db)):
    return crud.update_class(db, class_id, class_)

@router.delete("/classes/{class_id}")
def delete_class(class_id: str, db: Session = Depends(get_db)):
    return crud.delete_class(db, class_id)
