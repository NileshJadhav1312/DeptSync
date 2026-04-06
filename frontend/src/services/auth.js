import API from "./api";

export async function loginAdmin(payload) {
  const response = await API.post("/auth/admin/login", payload);
  return response.data;
}

export async function loginTeacher(payload) {
  const response = await API.post("/auth/teacher/login", payload);
  return response.data;
}

export async function signupAdmin(payload) {
  const response = await API.post("/auth/admin/signup", payload);
  return response.data;
}

export async function loginStudent(payload) {
  const response = await API.post("/auth/student/login", payload);
  return response.data;
}

export async function signupStudent(payload) {
  const response = await API.post("/auth/student/signup", payload);
  return response.data;
}
