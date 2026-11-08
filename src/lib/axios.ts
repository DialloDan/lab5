import axios from 'axios';
import { useAuthStore } from "@/store/auth-store";

// Створення окремого інстансу Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Якщо токен доступний у змінній середовища -- додаємо в Authorization
const token = import.meta.env.VITE_API_AUTH_TOKEN;
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Інтерцептор для відправки JWT
apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Інтерцептор для відповіді (обробка помилок)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Тут можна додати глобальну обробку помилок
    console.error('API Error:', error.response?.data || error.message);
    // Можна також виводити повідомлення користувачу через toast
    // toast.error(error.response?.data?.message || 'Unknown error');
    return Promise.reject(error);
  }
);
export default apiClient;