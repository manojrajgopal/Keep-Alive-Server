const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
  const res = await fetch(`${API_BASE}/projects/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
