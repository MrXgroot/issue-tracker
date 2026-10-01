import api from "../../../lib/axios";

export async function getIssueComments(issueId) {
  const response = await api.get(`/issues/${issueId}/comments`);
  return response.data;
}

export async function createComment({ issueId, text }) {
  const response = await api.post(`/issues/${issueId}/comments`, { text });
  return response.data;
}

export async function deleteComment(id) {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
}
