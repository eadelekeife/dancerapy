import Axios from "axios";

// localhost
// 192.168.0.120
// 172.20.10.2
// backend.dancerapy.org
// http://192.168.0.120:8000

const axiosCall = Axios.create({
    baseURL: "https://backend.dancerapy.org/api/v1/dancerapy/"
});

export default axiosCall;