import axios from "axios"

const access_token = localStorage.getItem('access_token')

const baseapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/users/", })
const basedocapi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/doctors/"
})
const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/users/", headers: { Authorization: `Bearer ${access_token}` } })
const adminapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/admins/", headers: { Authorization: `Bearer ${access_token}` } })
const doctorapi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/doctors/", headers: { Authorization: `Bearer ${access_token}` }
});

let isRefreshing = false;
const subscribers = [];

const onRefreshed = (token) => {
    subscribers.forEach((callback) => callback(token));
    subscribers.length = 0; // Clear the subscribers after notifying
};

const addInterceptors = (instance) => {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { config, response } = error;
            const refresh_token = localStorage.getItem('refresh_token');

            if (response && response.status === 401 && !config._retry) {
                config._retry = true;

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const response = await axios.post(
                            'http://127.0.0.1:8000/token/refresh/',
                            { refresh: refresh_token },
                            { headers: { 'Content-Type': 'application/json' } }
                        );

                        const newAccessToken = response.data.access;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        localStorage.setItem('access_token', newAccessToken);

                        onRefreshed(newAccessToken);

                        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return instance(config);
                    } catch (refreshError) {
                        console.error('Token refresh failed:', refreshError);
                        return Promise.reject(refreshError);
                    } finally {
                        isRefreshing = false;
                    }
                }

                // Return a new promise that resolves when the token is refreshed
                return new Promise((resolve) => {
                    subscribers.push((token) => {
                        config.headers['Authorization'] = `Bearer ${token}`;
                        resolve(instance(config));
                    });
                });
            }

            return Promise.reject(error);
        }
    );
};

addInterceptors(api);
addInterceptors(adminapi);
addInterceptors(doctorapi);



export { api, adminapi, doctorapi, baseapi, basedocapi }