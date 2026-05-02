import API from "./api";

export async function getAchievements() {
  const response = await API.get("/achievements");
  return response.data;
}

export async function createAchievement(payload) {
  const response = await API.post("/achievements", payload);
  return response.data;
}

export async function updateAchievement(id, payload) {
  const response = await API.put(`/achievements/${id}`, payload);
  return response.data;
}

export async function deleteAchievement(id) {
  const response = await API.delete(`/achievements/${id}`);
  return response.data;
}

export async function getDepartmentAchievements(departmentId, params) {
  const response = await API.get(`/achievements/department/${departmentId}`, { params });
  return response.data;
}

export async function reviewAchievement(id, payload) {
  const response = await API.put(`/achievements/review/${id}`, payload);
  return response.data;
}
