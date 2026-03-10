import React from "react";

export default function StudentTable({students, onDelete}) {

  return (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Major</th>
          <th>GPA</th>
          <th>Class</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {students.map(s => (
          <tr key={s.student_id}>
            <td>{s.student_id}</td>
            <td>{s.name}</td>
            <td>{s.major}</td>
            <td>{s.gpa}</td>
            <td>{s.class_id}</td>
            <td>
              <button onClick={()=>onDelete(s.student_id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}