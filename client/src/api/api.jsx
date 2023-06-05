import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const originalRequest = error.config;
    const { status, data } = error.response;
    if (status == 404 && data.message == 'jwt expired') {
      api
        .get(`/auth/newtoken`)
        .then((res) => {
          return api(originalRequest);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default api;
