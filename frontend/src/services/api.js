import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Doctor APIs
export const getDoctors = async (search = '', specialization = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (specialization) params.append('specialization', specialization);
  
  const response = await axios.get(`${API}/doctors?${params.toString()}`);
  return response.data;
};

export const getDoctor = async (doctorId) => {
  const response = await axios.get(`${API}/doctors/${doctorId}`);
  return response.data;
};

export const createDoctor = async (doctorData) => {
  const response = await axios.post(`${API}/doctors`, doctorData, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Appointment APIs
export const createAppointment = async (appointmentData) => {
  const response = await axios.post(`${API}/appointments`, appointmentData, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getMyAppointments = async () => {
  const response = await axios.get(`${API}/appointments/my`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAppointment = async (appointmentId) => {
  const response = await axios.get(`${API}/appointments/${appointmentId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Billing APIs
export const getMyBilling = async () => {
  const response = await axios.get(`${API}/billing/my`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getBilling = async (billId) => {
  const response = await axios.get(`${API}/billing/${billId}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const payBill = async (billId) => {
  const response = await axios.put(`${API}/billing/${billId}/pay`, {}, {
    headers: getAuthHeader()
  });
  return response.data;
};

// Admin APIs
export const getAllAppointments = async () => {
  const response = await axios.get(`${API}/admin/appointments`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAllBilling = async () => {
  const response = await axios.get(`${API}/admin/billing`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getAdminStats = async () => {
  const response = await axios.get(`${API}/admin/stats`, {
    headers: getAuthHeader()
  });
  return response.data;
};
