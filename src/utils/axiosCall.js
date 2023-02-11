import Axios from "axios";

// localhost

const axiosCall = Axios.create({
    baseURL: "http://192.168.0.120:8000/api/v1/dancerapy/"
});

export default axiosCall;