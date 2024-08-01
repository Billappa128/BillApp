import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from "./Profile.module.css";
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom';
import moment from 'moment';

export default function Profile() {
    const [selectedUser, setSelectedUser] = useState(null);
    const passwordInput = useRef()
    const balanceInput = useRef()
    const { user } = useContext(AuthContext)
    const location = useLocation();
    const apiUrl = process.env.REACT_APP_API_URL;
    const PF = process.env.REACT_APP_URL_IMG;



    useEffect(() => {
        const fetchUser = async () => {
            const userID = location.pathname.split('/').pop();
            const token = user.token;
            if (token) {
                // Đính kèm token vào tiêu đề Authorization
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get(apiUrl + `/user/${userID}`)
                    setSelectedUser(res.data)
                } catch (err) {
                    // Xử lý lỗi
                }
            }
        }
        fetchUser();
    }, [location.pathname, user.token, apiUrl]);

    // Tính toán thời gian còn lại
    const getRemainingTime = () => {
        if (!selectedUser?.isPackage.purchasedAt) {
            return 'Chưa mua';
        }

        const purchasedAt = moment(selectedUser.isPackage.purchasedAt);
        const currentTime = moment();
        const duration = moment.duration(purchasedAt.diff(currentTime));

        // Kiểm tra nếu thời hạn còn hơn thời gian hiện tại thì đánh dấu là đã hết hạn
        if (duration.asMilliseconds() < 0) {
            return 'Đã hết hạn';
        }

        // Format thời gian còn lại dưới dạng "x ngày y giờ z phút"
        const days = duration.days();
        const hours = duration.hours();
        const minutes = duration.minutes();

        return `${days} ngày ${hours} giờ ${minutes} phút`;
    };

    const handleSubmit = async () => {
        const token = user.token;
        const userID = location.pathname.split('/').pop();
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.put(apiUrl + `/user/${userID}`, {
                    password: passwordInput.current.value
                })
                alert(`Thay đổi thành công`);
                window.location.replace("/admin");
            } catch (err) {
                // Xử lý lỗi
            }
        }
    }
    const handleBalance = async () => {
        const token = user.token;
        const userID = location.pathname.split('/').pop();
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.put(apiUrl + `/user/${userID}`, {
                    balance: balanceInput.current.value
                })
                alert(`Thay đổi thành công`);
                window.location.replace("/admin");
            } catch (err) {
                // Xử lý lỗi
            }
        }
    }

    const handleDeleteAccount = async () => {
        const token = user.token;
        const userID = location.pathname.split('/').pop();
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.delete( apiUrl + `/user/${userID}`)
                alert(`Đã xóa tài khoản này`);
                window.location.replace("/admin");
            } catch (err) {
                // Xử lý lỗi
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className={`${styles.boxAvatar} `}>
                    <img className={`mb-4 ${styles.avatar}`} src={`${PF}/NoAvatar.png`} alt="Avatar" />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className={`col-md-6 ${styles.boxInfo}`}>
                    <h2 className="text-center">Thông tin cá nhân</h2>
                    <hr />
                    <div><strong>ID User:</strong> {selectedUser?._id}</div>
                    <div><strong>Tên User:</strong> {selectedUser?.username}</div>
                    <div><strong>Email:</strong> {selectedUser?.email}</div>
                    <div><strong>Số dư:</strong> {selectedUser?.balance}</div>
                    <div><strong>Gói tháng:</strong> {selectedUser?.isPackage.purchasedStatus === true ? "Đã mua" : "Chưa mua"}</div>
                    <div><strong>Thời hạn gói tháng:</strong> {getRemainingTime()}</div>
                    <div><strong>Tổng số tiền đã nạp:</strong> {selectedUser?.totalDeposit}</div>
                    <div><strong>Số lượng bill đã in:</strong> {selectedUser?.products.length}</div>
                    {user.isAdmin ? <div>
                        <h1 className='my-3'>Form cấp lại mật khẩu</h1>
                        <form onSubmit={handleSubmit} className={styles.editform}>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <input ref={passwordInput} type="text"
                                            name="receiverName"
                                            id="form6Example2" placeholder='acb123' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Mật khẩu</label>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn-c'>Cấp lại mật khẩu</button>
                        </form>
                        <form onSubmit={handleBalance} className={`${styles.editform} my-4`}>
                            <div className="row">
                                <div className="col">
                                    <div className="form-outline">
                                        <input ref={balanceInput} type="text"
                                            id="form6Example2" placeholder='1000' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Số dư</label>
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn-c'>Đặt lại số dư</button>
                        </form>
                        <button onClick={handleDeleteAccount} className={`${styles.noo} btn-c my-3`}>Xóa tài khoản</button>
                    </div> : ""}
                </div>
            </div>
        </div>
    )
}
