import API from "./api";

export async function getActivities() {
  const response = await API.get("/activities");
  return response.data;
}

export async function createActivity(payload) {
  const response = await API.post("/activities", payload);
  return response.data;
}

export async function updateActivity(id, payload) {
  const response = await API.put(`/activities/${id}`, payload);
  return response.data;
}

export async function deleteActivity(id) {
  const response = await API.delete(`/activities/${id}`);
  return response.data;
}
