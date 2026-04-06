import API from "./api";

export async function getTeacherProfile(teacherId) {
  const response = await API.get(`/auth/teacher/profile/${teacherId}`);
  return response.data;
}

export async function getAdminProfile(adminId) {
  const response = await API.get(`/auth/admin/profile/${adminId}`);
  return response.data;
}

export async function updateTeacherProfile(teacherId, payload) {
  const response = await API.put(`/auth/teacher/profile/${teacherId}`, payload);
  return response.data;
}

export async function updateAdminProfile(adminId, payload) {
  const response = await API.put(`/auth/admin/profile/${adminId}`, payload);
  return response.data;
}

export async function changeTeacherPassword(teacherId, payload) {
  const response = await API.put(`/auth/teacher/password/${teacherId}`, payload);
  return response.data;
}

export async function changeAdminPassword(adminId, payload) {
  const response = await API.put(`/auth/admin/password/${adminId}`, payload);
  return response.data;
}

export async function getStudentProfile(studentId) {
  const response = await API.get(`/auth/student/profile/${studentId}`);
  return response.data;
}

export async function updateStudentProfile(studentId, payload) {
  const response = await API.put(`/auth/student/profile/${studentId}`, payload);
  return response.data;
}

export async function changeStudentPassword(studentId, payload) {
  const response = await API.put(`/auth/student/password/${studentId}`, payload);
  return response.data;
}
