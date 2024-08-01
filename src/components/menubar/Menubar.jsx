import React, { useContext, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import Logo from '../logo/Logo'
import styles from "./Menubar.module.css"
import Icontext from '../icontext/Icontext'
import Pricebill from '../pricebilll/Pricebill'
import { Link } from 'react-router-dom'
import axios from "axios"
import { UpdateUser } from "../../context/AuthActions";

export default function Menubar() {
  const [isIconRotating, setIconRotating] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;


  const handleIconClick = async () => {
    setIconRotating(true);

    const token = user.token;
    if (token) {
      // Đính kèm token vào tiêu đề Authorization
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const newUser = await axios.get(apiUrl + `/user/` + user._id)
        dispatch(UpdateUser(newUser.data));
        localStorage.setItem("user", JSON.stringify(newUser));
      } catch (err) {
        // Xử lý lỗi
      }
    }
    setTimeout(() => {
      setIconRotating(false);
    }, 1000);
  };
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.replace("/")
}
  return (
    <div className={styles.menubar}>
      <Logo />
      <span className={styles.balance}>{`Số dư ví : ${user.balance}đ`}<i onClick={handleIconClick} className={`fa-solid fa-repeat ml-3 ${isIconRotating ? styles.rotateIcon : ''}`}></i></span>
      <h5>MENU CHỨC NĂNG</h5><i className="fa-solid "></i>
      <Link to="/" className="link">
        <Icontext icon={"fa-house"} text={"Dashboard"} />
      </Link>
      <Link to="/service" className="link">
        <Icontext icon={"fa-cube"} text={"Gói tài khoản"} />
      </Link>
      <Pricebill icon={"fa-money-bill"} text={"Bảng giá bill"} />
      <Link to="/deposit" className="link">
        <Icontext icon={"fa-wallet"} text={"Nạp tiền"} />
      </Link>
      <h5>MENU TẠO BILL</h5><i className="fa-solid "></i>
      <Link to="/bill/banking" className="link">
        <Icontext icon={"fa-building-columns"} text={"Bill chuyển khoản"} />
      </Link>
      <Link to="/bill/checking" className="link">
        <Icontext icon={"fa-building-columns"} text={"Bill biến động"} />
      </Link>
      <Link to="/bill/balance" className="link">
        <Icontext icon={"fa-building-columns"} text={"Bill số dư"} />
      </Link>
      <h5>MENU KHÁC</h5><i className="fa-solid "></i>
      <a rel="noopener noreferrer" target="_blank" href="https://t.me/Billgateshop">
      <Icontext icon={"fa-share-nodes"} text={"Liên kết giúp đỡ"} />
        </a>
      <a rel="noopener noreferrer" target="_blank" href="https://t.me/Billgateshop">
      <Icontext icon={"fa-shop"} text={"Shop app & Phôi"} />
        </a>
      <span onClick={handleLogout}><Icontext icon={"fa-right-from-bracket"} text={"Đăng xuất"} /></span>
    </div>
  )
}
