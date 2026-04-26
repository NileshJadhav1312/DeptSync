import API from "./api";

export async function getDepartments() {
  const response = await API.get("/admin/departments");
  return response.data;
}

export async function getGeneratedDeptCode() {
  const response = await API.get("/admin/departments/generate-code");
  return response.data;
}

export async function getTeachers(params = {}) {
  const response = await API.get("/admin/teachers", { params });
  return response.data;
}

export async function getDepartment(id) {
  const response = await API.get(`/admin/departments/${id}`);
  return response.data;
}

export async function createDepartment(payload) {
  const response = await API.post("/admin/departments", payload);
  return response.data;
}

export async function createTeacher(payload) {
  const response = await API.post("/admin/teachers", payload);
  return response.data;
}

export async function updateTeacher(id, payload) {
  const response = await API.put(`/admin/teachers/${id}`, payload);
  return response.data;
}

export async function deleteTeacher(id) {
  const response = await API.delete(`/admin/teachers/${id}`);
  return response.data;
}

export async function getDepartmentStudents(departmentId) {
  const response = await API.get(`/admin/departments/${departmentId}/students`);
  return response.data;
}
