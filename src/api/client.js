import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://atlas-logistics-system.vercel.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Interceptor para erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, senha) => api.post('/api/auth/login', { email, senha }),
  register: (nome, email, senha) => api.post('/api/auth/register', { nome, email, senha })
};

export const clientesAPI = {
  list: () => api.get('/api/clientes'),
  create: (data) => api.post('/api/clientes', data)
};

export const operacoesAPI = {
  list: () => api.get('/api/operacoes'),
  create: (data) => api.post('/api/operacoes', data),
  update: (id, data) => api.patch(`/api/operacoes/${id}`, data)
};

export const healthAPI = {
  check: () => api.get('/api/health')
};

export default api;
