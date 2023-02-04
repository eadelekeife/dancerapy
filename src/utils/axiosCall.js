import Axios from "axios";

const axiosCall = Axios.create({
    baseURL: "http://localhost:8000/api/v1/dancerapy/"
});

export default axiosCall;