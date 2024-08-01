import React, { useEffect, useState, useContext } from 'react'
import styles from "./Deposit.module.css"
import axios from "axios"
import { AuthContext } from '../../../context/AuthContext'

export default function Deposit() {
    const [deposit, setDeposit] = useState([])
    const { user } = useContext(AuthContext)
    const apiUrl = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchPosts = async () => {
            const token = user.token;
            if (token) {
                // Đính kèm token vào tiêu đề Authorization
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get(apiUrl + "/deposit/")
                    setDeposit(res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt)
                    }))
                } catch (err) {
                    // Xử lý lỗi
                }
            }
        }
        fetchPosts()
    }, [user.token, apiUrl])

    const handleButtonClick = async (option, id) => {
        const token = user.token;
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.put(apiUrl + `/deposit/${option}/${id}`)
                alert(`${res.data.message}`);
                window.location.replace("/admin");
            } catch (err) {
                // Xử lý lỗi
            }
        }
    }
    return (
        <div className={styles.deposit}>
            <h1>Quản lí đơn nạp tiền</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên KH</th>
                        <th scope="col">Số tiền</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {deposit.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.user?.username}</td>
                            <td>{item.amount}</td>
                            <td>{item.desc}</td>
                            <td>{item.status}</td>
                            <td>
                                {item.status === "confirmed" || item.status === "rejected" ?
                                    <span>Đã xử lí</span>
                                    : (<>
                                        <span onClick={() => handleButtonClick("confirm", item._id)} className={`${styles.oke} btn-c mr-4`}>Chấp nhận</span>
                                        <span onClick={() => handleButtonClick("reject", item._id)} className={`${styles.noo} btn-c`}>Từ chối</span>
                                    </>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
