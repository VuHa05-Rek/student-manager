from pydantic import BaseModel


class ClassBase(BaseModel):
    class_name: str
    advisor: str

class ClassCreate(ClassBase):
    class_id: str

class Class(ClassBase):
    class_id: str

    class Config:
        orm_mode = True

class StudentBase(BaseModel):
    name: str
    birth_year: int
    major: str
    gpa: float
    class_id: str

class StudentCreate(StudentBase):
    student_id: str

class Student(StudentBase):
    student_id: str

    class Config:
        orm_mode = True