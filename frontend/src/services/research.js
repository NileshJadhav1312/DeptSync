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

// 7. Journal Publications
export const getJournalPublications = async (params) => {
  const response = await api.get("/journal-publications", { params });
  return response.data;
};
export const getJournalPublicationById = async (id) => {
  const response = await api.get(`/journal-publications/${id}`);
  return response.data;
};
export const createJournalPublication = async (data) => {
  const response = await api.post("/journal-publications", data);
  return response.data;
};
export const updateJournalPublication = async (id, data) => {
  const response = await api.put(`/journal-publications/${id}`, data);
  return response.data;
};
export const deleteJournalPublication = async (id) => {
  const response = await api.delete(`/journal-publications/${id}`);
  return response.data;
};

// 8. Conference Publications
export const getConferencePublications = async (params) => {
  const response = await api.get("/conference-publications", { params });
  return response.data;
};
export const getConferencePublicationById = async (id) => {
  const response = await api.get(`/conference-publications/${id}`);
  return response.data;
};
export const createConferencePublication = async (data) => {
  const response = await api.post("/conference-publications", data);
  return response.data;
};
export const updateConferencePublication = async (id, data) => {
  const response = await api.put(`/conference-publications/${id}`, data);
  return response.data;
};
export const deleteConferencePublication = async (id) => {
  const response = await api.delete(`/conference-publications/${id}`);
  return response.data;
};
export const reviewConferencePublication = async (id, data) => {
  const response = await api.put(`/conference-publications/review/${id}`, data);
  return response.data;
};


// 9. Book Chapters
export const getBookChapters = async (params) => {
  const response = await api.get("/book-chapters", { params });
  return response.data;
};
export const getBookChapterById = async (id) => {
  const response = await api.get(`/book-chapters/${id}`);
  return response.data;
};
export const createBookChapter = async (data) => {
  const response = await api.post("/book-chapters", data);
  return response.data;
};
export const updateBookChapter = async (id, data) => {
  const response = await api.put(`/book-chapters/${id}`, data);
  return response.data;
};
export const deleteBookChapter = async (id) => {
  const response = await api.delete(`/book-chapters/${id}`);
  return response.data;
};

// 10. Patents
export const getPatents = async (params) => {
  const response = await api.get("/patents", { params });
  return response.data;
};
export const getPatentById = async (id) => {
  const response = await api.get(`/patents/${id}`);
  return response.data;
};
export const createPatent = async (data) => {
  const response = await api.post("/patents", data);
  return response.data;
};
export const updatePatent = async (id, data) => {
  const response = await api.put(`/patents/${id}`, data);
  return response.data;
};
export const deletePatent = async (id) => {
  const response = await api.delete(`/patents/${id}`);
  return response.data;
};

// 11. Copyrights
export const getCopyrights = async (params) => {
  const response = await api.get("/copyrights", { params });
  return response.data;
};
export const getCopyrightById = async (id) => {
  const response = await api.get(`/copyrights/${id}`);
  return response.data;
};
export const createCopyright = async (data) => {
  const response = await api.post("/copyrights", data);
  return response.data;
};
export const updateCopyright = async (id, data) => {
  const response = await api.put(`/copyrights/${id}`, data);
  return response.data;
};
export const deleteCopyright = async (id) => {
  const response = await api.delete(`/copyrights/${id}`);
  return response.data;
};
