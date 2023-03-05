import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
axios.defaults.baseURL = serverUrl
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true
export default axios;


