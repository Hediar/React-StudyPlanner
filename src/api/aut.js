import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_AUTAPI_URL}user`,
});

instance.interceptors.request.use(
  function (config) {
    return;
  },
  function (error) {
    return;
  }
);

instance.interceptors.response.use(
  function (config) {
    return;
  },
  function (error) {
    return;
  }
);
export default instance;
