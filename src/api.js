import axios from "axios"

const access_token = localStorage.getItem('access_token')


const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/users/", headers: { Authorization: `Bearer ${access_token}` } })
const adminapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/admins/", headers: { Authorization: `Bearer ${access_token}` } })

let isRefreshing = false;
let subscribers = [];

const onRefreshed = (token) => {
    subscribers.forEach((callback) => callback(token));
    subscribers = [];
};
const addInterceptors = (instance) => {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 401) {
                const refresh_token = localStorage.getItem('refresh_token');

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const response = await axios.post(
                            'http://localhost:8000/token/refresh/',
                            { refresh: refresh_token },
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);

                        onRefreshed(response.data.access);

                        return instance(error.config);
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                return new Promise((resolve) => {
                    subscribers.push((token) => {
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        resolve(instance(error.config));
                    });
                });
            }

            return Promise.reject(error);
        }
    );
};


addInterceptors(api);
addInterceptors(adminapi);

const doctorapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/doctors/" })
export { api, adminapi, doctorapi }