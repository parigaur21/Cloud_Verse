// In production, Nginx will proxy /api to the backend
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export async function getHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function createDeployment(name) {
  const res = await fetch(`${BASE_URL}/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function getDeployments() {
  const res = await fetch(`${BASE_URL}/deployments`);
  return res.json();
}

export async function deleteDeployment(id) {
  await fetch(`${BASE_URL}/deployments/${id}`, {
    method: "DELETE",
  });
}