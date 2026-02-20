const BASE_URL = "http://localhost:5000";

export async function getHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function createDeployment() {
  const res = await fetch(`${BASE_URL}/deploy`, {
    method: "POST",
  });
  return res.json();
}

export async function getDeployments() {
  const res = await fetch(`${BASE_URL}/deployments`);
  return res.json();
}