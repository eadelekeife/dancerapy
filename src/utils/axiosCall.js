import Axios from "axios";

// localhost
// 192.168.0.120
// 172.20.10.2
// https://backend.dancerapy.org
// http://192.168.0.120:8000
// http://localhost:8000

const axiosCall = Axios.create({
    baseURL: "http://localhost:8000/api/v1/dancerapy/"
});

export const userAxiosCall = Axios.create({
    baseURL: "http://localhost:8000/api/v1/users/"
});

export default axiosCall;