import api from "./api";

// 1. Book Publications
export const getBookPublications = async (params) => {
  const response = await api.get("/book-publications", { params });
  return response.data;
};
export const getBookPublicationById = async (id) => {
  const response = await api.get(`/book-publications/${id}`);
  return response.data;
};
export const createBookPublication = async (data) => {
  const response = await api.post("/book-publications", data);
  return response.data;
};
export const updateBookPublication = async (id, data) => {
  const response = await api.put(`/book-publications/${id}`, data);
  return response.data;
};
export const deleteBookPublication = async (id) => {
  const response = await api.delete(`/book-publications/${id}`);
  return response.data;
};

// 2. Committees
export const getCommittees = async (params) => {
  const response = await api.get("/committees", { params });
  return response.data;
};
export const getCommitteeById = async (id) => {
  const response = await api.get(`/committees/${id}`);
  return response.data;
};
export const createCommittee = async (data) => {
  const response = await api.post("/committees", data);
  return response.data;
};
export const updateCommittee = async (id, data) => {
  const response = await api.put(`/committees/${id}`, data);
  return response.data;
};
export const deleteCommittee = async (id) => {
  const response = await api.delete(`/committees/${id}`);
  return response.data;
};

// 3. Research Papers
export const getResearchPapers = async (params) => {
  const response = await api.get("/research-papers", { params });
  return response.data;
};
export const getResearchPaperById = async (id) => {
  const response = await api.get(`/research-papers/${id}`);
  return response.data;
};
export const createResearchPaper = async (data) => {
  const response = await api.post("/research-papers", data);
  return response.data;
};
export const updateResearchPaper = async (id, data) => {
  const response = await api.put(`/research-papers/${id}`, data);
  return response.data;
};
export const deleteResearchPaper = async (id) => {
  const response = await api.delete(`/research-papers/${id}`);
  return response.data;
};

// 4. Grants
export const getGrants = async (params) => {
  const response = await api.get("/grants", { params });
  return response.data;
};
export const getGrantById = async (id) => {
  const response = await api.get(`/grants/${id}`);
  return response.data;
};
export const createGrant = async (data) => {
  const response = await api.post("/grants", data);
  return response.data;
};
export const updateGrant = async (id, data) => {
  const response = await api.put(`/grants/${id}`, data);
  return response.data;
};
export const deleteGrant = async (id) => {
  const response = await api.delete(`/grants/${id}`);
  return response.data;
};

// 5. Editorial Boards
export const getEditorialBoards = async (params) => {
  const response = await api.get("/editorial-boards", { params });
  return response.data;
};
export const getEditorialBoardById = async (id) => {
  const response = await api.get(`/editorial-boards/${id}`);
  return response.data;
};
export const createEditorialBoard = async (data) => {
  const response = await api.post("/editorial-boards", data);
  return response.data;
};
export const updateEditorialBoard = async (id, data) => {
  const response = await api.put(`/editorial-boards/${id}`, data);
  return response.data;
};
export const deleteEditorialBoard = async (id) => {
  const response = await api.delete(`/editorial-boards/${id}`);
  return response.data;
};

// 6. Consultancies
export const getConsultancies = async (params) => {
  const response = await api.get("/consultancies", { params });
  return response.data;
};
export const getConsultancyById = async (id) => {
  const response = await api.get(`/consultancies/${id}`);
  return response.data;
};
export const createConsultancy = async (data) => {
  const response = await api.post("/consultancies", data);
  return response.data;
};
export const updateConsultancy = async (id, data) => {
  const response = await api.put(`/consultancies/${id}`, data);
  return response.data;
};
export const deleteConsultancy = async (id) => {
  const response = await api.delete(`/consultancies/${id}`);
  return response.data;
};
