import React, { useState, useEffect } from "react";
import { getStudents, deleteStudent, searchStudents, getStatistics, exportStudentsCSV } from "../api";
import StudentTable from "../components/StudentTable";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [statistics, setStatistics] = useState({});

  const loadStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
    loadStatistics();
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      loadStudents();
    } else {
      const data = await searchStudents(e.target.value);
      setStudents(data);
    }
  };

  const loadStatistics = async () => {
    const stats = await getStatistics();
    setStatistics(stats);
  };

  const handleExport = async () => {
    const csv = await exportStudentsCSV();
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    loadStudents();
    loadStatistics();
  }, []);

  return (
    <div>
      <h1>Student List</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={handleSearch}
        style={{ marginBottom: 10 }}
      />
      <button onClick={handleExport} style={{ marginLeft: 10 }}>Export to CSV</button>
      <StudentTable students={students} onDelete={handleDelete} />
      <div style={{ marginTop: 20 }}>
        <h2>Statistics</h2>
        <div>Total students: {statistics.total_students}</div>
        <div>Average GPA: {statistics.average_gpa}</div>
        <div>
          Students by major:
          <ul>
            {statistics.students_by_major && Object.entries(statistics.students_by_major).map(([major, count]) => (
              <li key={major}>{major}: {count}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
