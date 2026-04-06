import API from "./api";

export async function createClassroom(payload) {
  const response = await API.post("/classrooms/create", payload);
  return response.data;
}

export async function getDepartmentClassrooms(departmentId) {
  const response = await API.get(`/classrooms/department/${departmentId}`);
  return response.data;
}

export async function getTeacherClassrooms(teacherId) {
  const response = await API.get(`/classrooms/teacher/${teacherId}`);
  return response.data;
}

export async function joinDepartment(payload) {
  const response = await API.post("/classrooms/join-department", payload);
  return response.data;
}

export async function requestJoinClass(payload) {
  const response = await API.post("/classrooms/join-class", payload);
  return response.data;
}

export async function acceptStudent(payload) {
  const response = await API.post("/classrooms/accept-student", payload);
  return response.data;
}
