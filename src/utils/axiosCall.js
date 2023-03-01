import Axios from "axios";

// localhost
// 192.168.0.120
// 172.20.10.2

const axiosCall = Axios.create({
    baseURL: "http://localhost:8000/api/v1/dancerapy/"
});

export default axiosCall;