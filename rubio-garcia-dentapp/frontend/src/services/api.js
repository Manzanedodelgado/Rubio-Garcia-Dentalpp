import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Patients
export const patientsAPI = {
  list: (params) => api.get('/patients', { params }),
  get: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
  history: (id) => api.get(`/patients/${id}/history`),
};

// Appointments
export const appointmentsAPI = {
  list: (params) => api.get('/appointments', { params }),
  get: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  stats: () => api.get('/appointments/stats'),
};

// Conversations
export const conversationsAPI = {
  list: (params) => api.get('/conversations', { params }),
  get: (id) => api.get(`/conversations/${id}`),
  create: (data) => api.post('/conversations', data),
  updateStatus: (id, status) => api.put(`/conversations/${id}/status`, null, { params: { status } }),
  messages: (id, params) => api.get(`/conversations/${id}/messages`, { params }),
  sendMessage: (id, data) => api.post(`/conversations/${id}/messages`, data),
};

// WhatsApp
export const whatsappAPI = {
  status: () => api.get('/whatsapp/status'),
  qr: () => api.get('/whatsapp/qr'),
  sendMessage: (data) => api.post('/whatsapp/send-message', data),
};

// Templates
export const templatesAPI = {
  listMessages: (params) => api.get('/templates/messages', { params }),
  getMessage: (id) => api.get(`/templates/messages/${id}`),
  createMessage: (data) => api.post('/templates/messages', data),
  updateMessage: (id, data) => api.put(`/templates/messages/${id}`, data),
  deleteMessage: (id) => api.delete(`/templates/messages/${id}`),
  listConsents: (params) => api.get('/templates/consents', { params }),
  createConsent: (data) => api.post('/templates/consents', data),
};

// AI
export const aiAPI = {
  knowledge: () => api.get('/ai/knowledge'),
  classify: (message) => api.post('/ai/classify', { message }),
  respond: (data) => api.post('/ai/respond', data),
  config: () => api.get('/ai/config'),
  updateConfig: (data) => api.put('/ai/config', data),
};

export default api;
