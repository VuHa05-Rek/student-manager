from sqlalchemy import Column, String, Integer, Float, ForeignKey
from .database import Base

class Class(Base):
    __tablename__ = "classes"

    class_id = Column(String, primary_key=True, index=True)
    class_name = Column(String)
    advisor = Column(String)

class Student(Base):
    __tablename__ = "students"

    student_id = Column(String, primary_key=True, index=True)
    name = Column(String)
    birth_year = Column(Integer)
    major = Column(String)
    gpa = Column(Float)
    class_id = Column(String, ForeignKey("classes.class_id"))