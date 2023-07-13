import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_AUTAPI_URL}`,
});

// 응답 내보내기 전
instance.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    const msg = error.response.data.message;
    const status = error.response.status;
    // console.log("응답 보내기 전", error);
    // console.log(msg);
    /**
     * 만료 된 채로 요청 -> 401 에러 -> 메시지 출력, token 삭제 후 login page로 이동
     */
    if (status === 401) {
      if (msg === "토큰이 만료되었습니다. 토큰은 60분간 유지됩니다.") {
        document.cookie = "token=; expires=-1;";

        return "expire";
      } else if (
        msg === "위조되었거나 잘못된 형식의 token입니다.(jwt malformed)"
      ) {
        document.cookie = "token=; expires=-1;";
        return "falsify";
      } else if (msg === "token value가 존재하지 않습니다.") {
        return "nonetoken";
      } else {
        return;
      }
    }

    return error;
  }
);
export default instance;
