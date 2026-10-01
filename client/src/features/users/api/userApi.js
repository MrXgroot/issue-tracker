import api from "../../../lib/axios";

export async function getUsers() {
  const response = await api.get("/users");
  return response.data;
}

export async function getUserById(id) {
  const response = await api.get(`/users/${id}`);
  return response.data;
}
