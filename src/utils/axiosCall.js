import Axios from "axios";

// localhost
// 192.168.0.120
// 172.20.10.2
// backend.dancerapy.org

const axiosCall = Axios.create({
    baseURL: "http://192.168.0.120:8000/api/v1/dancerapy/"
});

export default axiosCall;