import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(apiUrl + "/auth/login", userCredential);
    alert("Đăng nhập thành công");
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    alert("Đã xảy ra lỗi, vui lòng thực hiện lại")
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};