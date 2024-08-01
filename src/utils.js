// utils.js
import axios from "axios";
import { UpdateUser } from "./context/AuthActions";
const apiUrl = process.env.REACT_APP_API_URL;

// Hàm upload ảnh và xử lý in bill
export const handleSubmit = async (formData, user, dispatch, filename, blob) => {
  // Xử lí in bill
  const token = user.token;
  const inBill = {
    photo: filename,
    author: user._id,
    amount: 50, // Thay đổi giá trị amount thành giá trị thích hợp
  };
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      await axios.post(apiUrl + '/product/', inBill);
      console.log("In Bill thành công");

      const newUser = await axios.get(apiUrl + `/user/` + user._id);
      dispatch(UpdateUser(newUser.data));

      localStorage.setItem("user", JSON.stringify(newUser));
      try {
        await axios.post(apiUrl + "/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Tạo đường dẫn để tải ảnh về
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        downloadLink.click();
        alert(`In bill thành công`);
      } catch (err) {
        console.error("Lỗi khi upload ảnh:", err);
      }
    } catch (err) {
      console.error("Lỗi khi in Bill:", err);
    }
  }
};

// Các hàm xử lý khác nếu có
