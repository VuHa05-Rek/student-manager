from sqlalchemy.orm import Session
from . import models, schemas

def export_students_csv(db: Session):
    import csv
    import io
    students = db.query(models.Student).all()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["student_id", "name", "birth_year", "major", "gpa", "class_id"])
    for s in students:
        writer.writerow([s.student_id, s.name, s.birth_year, s.major, s.gpa, s.class_id])
    return output.getvalue()

# Student CRUD
def get_students(db: Session):
    return db.query(models.Student).all()

def search_students_by_name(db: Session, name: str):
    return db.query(models.Student).filter(models.Student.name.contains(name)).all()

def get_student_statistics(db: Session):
    total = db.query(models.Student).count()
    avg_gpa = db.query(models.Student).with_entities(models.Student.gpa).all()
    avg_gpa = round(sum([s[0] for s in avg_gpa])/total, 2) if total else 0
    majors = db.query(models.Student.major).distinct().all()
    major_counts = {}
    for m in majors:
        major_counts[m[0]] = db.query(models.Student).filter(models.Student.major == m[0]).count()
    return {
        "total_students": total,
        "average_gpa": avg_gpa,
        "students_by_major": major_counts
    }
def get_students(db: Session):
    return db.query(models.Student).all()

def create_student(db: Session, student: schemas.StudentCreate):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

def update_student(db: Session, student_id: str, student: schemas.StudentBase):
    db_student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    if db_student:
        for key, value in student.dict().items():
            setattr(db_student, key, value)

        db.commit()
        db.refresh(db_student)

    return db_student

def delete_student(db: Session, student_id: str):
    db_student = db.query(models.Student).filter(
        models.Student.student_id == student_id
    ).first()

    if db_student:
        db.delete(db_student)
        db.commit()

    return db_student

# Class CRUD
def get_classes(db: Session):
    return db.query(models.Class).all()

def create_class(db: Session, class_: schemas.ClassCreate):
    db_class = models.Class(**class_.dict())
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

def update_class(db: Session, class_id: str, class_: schemas.ClassBase):
    db_class = db.query(models.Class).filter(
        models.Class.class_id == class_id
    ).first()
    if db_class:
        for key, value in class_.dict().items():
            setattr(db_class, key, value)
        db.commit()
        db.refresh(db_class)
    return db_class

def delete_class(db: Session, class_id: str):
    db_class = db.query(models.Class).filter(
        models.Class.class_id == class_id
    ).first()
    if db_class:
        db.delete(db_class)
        db.commit()
    return db_class