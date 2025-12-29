const API_BASE = "http://127.0.0.1:8000";

export async function getProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  return res.json();
}

export async function addProject(data) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateProject(id, data) {
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProject(id) {
  const res = await fetch(`http://127.0.0.1:8000/projects/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
