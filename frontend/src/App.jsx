import React from "react";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";

function App() {

  return (
    <div>
      <AddStudent/>
      <hr/>
      <StudentList/>
    </div>
  );
}

export default App;