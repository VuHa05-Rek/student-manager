import React, { useState, useEffect } from "react";

export default function AddStudent() {
  const [student, setStudent] = useState({
    student_id: "",
    name: "",
    birth_year: "",
    major: "",
    gpa: "",
    class_id: ""
  });

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      const data = await getClasses();
      setClasses(data);
    }
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(student);
    alert("Student added");
    window.location.reload();
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input name="student_id" placeholder="Student ID" onChange={handleChange} />
        <br />
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br />
        <input name="birth_year" placeholder="Birth Year" onChange={handleChange} />
        <br />
        <input name="major" placeholder="Major" onChange={handleChange} />
        <br />
        <input name="gpa" placeholder="GPA" onChange={handleChange} />
        <br />
        <select name="class_id" value={student.class_id} onChange={handleChange} required>
          <option value="">Select Class</option>
          {classes.map(cls => (
            <option key={cls.class_id} value={cls.class_id}>
              {cls.class_name} ({cls.class_id})
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
