
import { getToken, setToken } from "./token";
export const API_BASE_URL = "http://localhost:5000/api";export async function getPatient(patientId) {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/patient/${patientId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch patient");
  return data;
}

export async function getStats() {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/stat`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export async function getSessions(query = {}) {
  const token = await getToken();
  const params = new URLSearchParams(query).toString();
  const response = await fetch(
    `${API_BASE_URL}/session${params ? `?${params}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
}

export async function getMe() {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!data.success)
    throw new Error(data.message || "Failed to fetch user info");

  return data.data;
}

export async function register({ fullName, email, password, language }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullName, email, password, language }),
  });

  const data = await response.json();
  if (data.success) {
    await setToken(data.data.token);
  }
  return data;
}

export async function login({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (data.success) {
    await setToken(data.data.token);
  }
  return data;
}

export async function addPatient(patientData) {
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/patient`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(patientData),
  });

  return response.json();
}

export async function fetchPatients() {
  // Try to get token from AsyncStorage if not provided
  const token = await getToken();
  const response = await fetch(`${API_BASE_URL}/patient`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
}
