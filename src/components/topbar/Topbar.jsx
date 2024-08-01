import React, { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import styles from './Topbar.module.css';

export default function Topbar() {
  const {user} = useContext(AuthContext)

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <i className="fa-regular fa-user"></i>
        <i className="fa-solid fa-lock"></i>
        <i className="fa-solid fa-wallet"></i>
      </div>
      <div className={styles.right}>
        <i className="fa-solid fa-lightbulb"></i>
        <i className="fa-solid fa-magnifying-glass"></i>
        <i className="fa-solid fa-cart-shopping"></i>
        <i className="fa-regular fa-bell"></i>
        <div className={styles.balance}>
          <div>{`${user.balance} đ`}</div>
          <span>Số dư ví</span>
        </div>
        <div className={styles.balance}>
          <div>{user.username}</div>
          <span>Người dùng</span>
        </div>
        <div className={styles.avatar}>
            <img src="https://i.imgur.com/6keh4zq.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}
