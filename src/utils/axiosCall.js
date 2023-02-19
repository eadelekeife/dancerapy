import Axios from "axios";

// localhost
// 192.168.0.120

const axiosCall = Axios.create({
    baseURL: "http://172.20.10.2:8000/api/v1/dancerapy/"
});

export default axiosCall;