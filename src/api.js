import axios from "axios"

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api/users/", withCredentials: true })
const adminapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/admins/" })
const doctorapi = axios.create({ baseURL: "http://127.0.0.1:8000/api/doctors/" })
export { api, adminapi, doctorapi }