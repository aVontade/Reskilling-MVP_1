import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const askQuestion = async (question) => {
  try {
    const response = await api.post('/api/qa', { question });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to get answer');
  }
};

export const generateVisualization = async (description) => {
  try {
    const response = await api.post('/api/visualization', { description });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to generate visualization');
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/api/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend is not available');
  }
};

export default api;

