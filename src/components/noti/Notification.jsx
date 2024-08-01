import React, { useState, useRef, useContext, useEffect } from 'react'
import styles from "./Notification.module.css"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'

export default function Notification() {
    const [processing, setProcessing] = useState(false);
    const [notification, setNotification] = useState();
    const [showForm, setShowForm] = useState(false);
    const { user } = useContext(AuthContext)
    const componentRef = useRef(null);
    const apiUrl = process.env.REACT_APP_API_URL;


    const toggleForm = () => {
        setShowForm(!showForm);
    };

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
    }, [user.token, apiUrl]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (processing) return; // Ngăn người dùng nhấn liên tục
        const token = user.token;
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.post(apiUrl + `/noti/`, {
                    content: componentRef.current.value,
                    user: user._id
                })
                alert(`Đăng thông báo thành công`);
                setProcessing(true);

                window.location.replace("/admin");
            } catch (err) {
                setProcessing(true);
            }
        }


    };

    const handleButtonClick = async (id) => {
        const token = user.token;
        console.log(token)
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.delete(apiUrl + `/noti/${id}`)
                alert(`${res.data.message}`);
                window.location.replace("/admin");
            } catch (err) {
                // Xử lý lỗi
            }
        }
    }


    return (
        <div className={styles.notification}>
            <button className='btn-c' onClick={toggleForm}>{showForm ? "Ẩn" : "Đăng thông báo"}</button>
            {showForm && (
                <form onSubmit={handleFormSubmit}>
                    <h1>Thông báo hệ thống</h1>
                    <div className="row mb-4">
                        <div className="col">
                            <div className="form-outline">
                                <textarea type="text"
                                    rows="5" cols="50"
                                    ref={componentRef}
                                    placeholder='Nội dung thông báo' className={`form-control ${styles.inputCus}`}>
                                </textarea>
                            </div>
                        </div>
                    </div>

                    <button type='submit' className="btn-c btn-block mb-4" tabindex="4" disabled={processing}>
                        {processing ? "Đang xử lý..." : "Thông báo ngay"}
                    </button>
                </form>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {notification && notification.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.content}</td>
                            <td>
                                <span onClick={() => handleButtonClick(item._id)} className={`${styles.noo} btn-c mr-4`}>Xóa thông báo</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
