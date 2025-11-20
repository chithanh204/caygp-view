import axios from 'axios';

// Địa chỉ backend Node.js của bạn
const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- QUAN TRỌNG: Tự động gắn Token vào header ---
// Mỗi khi gọi API, code này sẽ tự kiểm tra xem có token trong localStorage không
// Nếu có, nó sẽ gắn vào header "Authorization"
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;