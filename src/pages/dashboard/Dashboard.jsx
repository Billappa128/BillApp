import styles from "./Dashboard.module.css"
import React, { useState, useEffect, useContext } from 'react'
import axios from "axios"
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../../context/AuthContext'

export default function Dashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState();
  const { user } = useContext(AuthContext)
  const apiUrl = process.env.REACT_APP_API_URL;


  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = user.token;
      if (token) {
        // Đính kèm token vào tiêu đề Authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(apiUrl + `/user/${user._id}`)
          setSelectedUser(res.data)
        } catch (err) {
          // Xử lý lỗi
        }
      }
    }
    fetchUser();
  }, [user, apiUrl]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = user.token;
      if (token) {
        // Đính kèm token vào tiêu đề Authorization
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(apiUrl + `/noti/`)
          setNotification(res.data)
        } catch (err) {
          // Xử lý lỗi
        }
      }
    }
    fetchUser();
  }, [user, apiUrl]);
  return (
    <div className={styles.main}>
      <div className={styles.subContent}>
        <h1 className={styles.title}>Dashboard</h1>
        <div className={styles.line}></div>
      </div>
      <div className="row">
        <div className="col-12 my-2">
          <div className={`card bg-danger text-white mb-2 ${styles.radiusF2}`}>
            <div className="card-body">
              <h4 className="card-title text-white">Cảnh báo!</h4>
              <p className="card-text">Bạn chưa xác minh email, để an toàn và tránh mất tài khoản vui lòng <a className="badge rounded-pill bg-warning draggable" href="https://autobill.shop/email-verified">nhấn
                vào đây</a> để đi đến
                trang xác minh.</p>
            </div>
          </div>
        </div>
        <div className="col-12 my-2">
          <div className={`card bg-success text-white mb-2 ${styles.radiusF2}`}>
            <div className="card-body">
              <p className="card-text">Mỗi tài khoản chỉ đăng nhập được cùng lúc 8 thiết bị,
                thiết bị thứ 9 đăng nhập sẽ đăng xuất 8
                thiết bị trước đó.</p>
            </div>
          </div>
        </div>
        <div className="col-12 mt-2 mb-4">
          <div className={`card mb-2  ${styles.radiusF1}`}>
            <div className="card-body">
              <p className="card-text">Vui lòng tham gia vào Group để nhận
                thông báo và hỗ trợ
                từ trang web.
                <a className={styles.cusLink} rel="noopener noreferrer" target="_blank" href="https://t.me/Billgateshop">Tại Đây</a>
              </p>

            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className={`${styles.cardne} card`}>
            <div className={`card-header ${styles.card1}`}>
              <div>
                <h2 className="fw-bolder mb-75">{selectedUser?.products.length}</h2>
                <p className="card-text">Tổng bill đã tạo</p>
              </div>
              <div className="avatar bg-light-primary p-50 m-0 d-flex align-item-center">
                <i className="fa-solid fa-book f-z-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className={`${styles.cardne} card`}>
            <div className={`card-header ${styles.card1}`}>
              <div>
                <h2 className="fw-bolder mb-75">0</h2>
                <p className="card-text">Tổng đơn hàng đã mua</p>
              </div>
              <div className="avatar bg-light-success p-50 m-0">
                <i className="fa-solid fa-book f-z-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className={`${styles.cardne} card`}>
            <div className={`card-header ${styles.card1}`}>
              <div>
                <h2 className="fw-bolder mb-75">{selectedUser?.totalDeposit - selectedUser?.balance} đ</h2>
                <p className="card-text">Tiền chi tiêu</p>
              </div>
              <div className="avatar bg-light-danger p-50 m-0">
                <i className="fa-solid fa-book f-z-24"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 col-12">
          <div className={`${styles.cardne} card`}>
            <div className={`card-header ${styles.card1}`}>
              <div>
                <h2 className="fw-bolder mb-75">{selectedUser?.balance} đ</h2>
                <p className="card-text">Tiền còn lại</p>
              </div>
              <div className="avatar bg-light-warning p-50 m-0">
                <i className="fa-solid fa-book f-z-24"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h1>Thông báo từ hệ thống</h1>
        {notification && notification.map((item) => (
          <div key={item._id} className={styles.notifi}>
            <div className="d-flex align-items-center justify-content-center">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <div className={styles.avatarBox}>
                  <img src="https://i.imgur.com/6keh4zq.jpg" alt="" />
                </div>
              </div>
              <div>{item.content}</div>
            </div>
            <div>{getTimeAgo(item.createdAt)}</div>
          </div>
          
        ))}
      </div>
    </div>
  )
}
