import React, { useEffect, useState } from "react";
import { getClasses } from "../api";

export default function ClassList() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function fetchClasses() {
      const data = await getClasses();
      setClasses(data);
    }
    fetchClasses();
  }, []);

  return (
    <div>
      <h1>Class List</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Class ID</th>
            <th>Class Name</th>
            <th>Advisor</th>
          </tr>
        </thead>
        <tbody>
          {classes.map(cls => (
            <tr key={cls.class_id}>
              <td>{cls.class_id}</td>
              <td>{cls.class_name}</td>
              <td>{cls.advisor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
