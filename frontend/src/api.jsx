const API_URL = "http://127.0.0.1:8000";

export const getStudents = async() => {
    const res = await fetch(`${API_URL}/students`);
    return res.json();
};

export const addStudent = async(student) => {
    await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
    });
};

export const deleteStudent = async(id) => {
    await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE"
    });
};

export const getClasses = async() => {
    const res = await fetch(`${API_URL}/classes`);
    return res.json();
};

export const searchStudents = async(name) => {
    const res = await fetch(`${API_URL}/students?name=${encodeURIComponent(name)}`);
    return res.json();
};

export const getStatistics = async() => {
    const res = await fetch(`${API_URL}/students/statistics`);
    return res.json();
};

export const exportStudentsCSV = async() => {
    const res = await fetch(`${API_URL}/students/export`);
    return res.text();
};