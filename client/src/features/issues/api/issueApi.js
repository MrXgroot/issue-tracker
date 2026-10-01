import api from "../../../lib/axios";

export async function getIssues(params = {}) {
  const response = await api.get("/issues", { params });
  return response.data;
}

export async function getDashboardSummary() {
  const response = await api.get("/issues/dashboard-summary");
  return response.data;
}

export async function getIssueById(id) {
  const response = await api.get(`/issues/${id}`);
  return response.data;
}

export async function createIssue(data) {
  const response = await api.post("/issues", data);
  return response.data;
}

export async function updateIssue({ id, data }) {
  const response = await api.patch(`/issues/${id}`, data);
  return response.data;
}

export async function deleteIssue(id) {
  const response = await api.delete(`/issues/${id}`);
  return response.data;
}
