import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const current_user = JSON.parse(localStorage.getItem('current_user'));
    if (current_user) {
      config.headers.userId = current_user._id || 'guess';
    }
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
    if (data.message === 'invalid signature' ||data.message === 'invalid user') {
      console.log('clear')
      localStorage.clear();
      return Promise.reject(error);
    }
    if (data.message == 'jwt expired') {
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
