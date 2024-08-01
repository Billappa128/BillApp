import React, { useEffect, useState, useContext } from 'react'
import styles from "./Manageruser.module.css"
import axios from "axios"
import { AuthContext } from '../../../context/AuthContext'
import {Link} from "react-router-dom"

export default function Manageruser() {
    const [dataUser, setDataUser] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            const token = user.token;
            if (token) {
                // Đính kèm token vào tiêu đề Authorization
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get("http://localhost:8000/api/user/")
                    setDataUser(res.data.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt)
                    }))
                } catch (err) {
                    // Xử lý lỗi
                }
            }
        }
        fetchPosts()
    }, [user.token])

    return (
        <div className={styles.deposit}>
            <h1>Quản lí đơn nạp tiền</h1>
            <div className=''>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Avatar</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số dư</th>
                        <th scope="col">Tổng nạp</th>
                        <th scope="col">Sl Bill</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser.map((item, index) => (
                        <tr key={item._id}>
                            <th scope="row">{index + 1}</th>
                            <td><img className={styles.avatar} src='http://localhost:8000/images/NoAvatar.png' alt='avatar' /></td>
                            <td>{item.username}</td>
                            <td>{item.balance}</td>
                            <td>{item.totalDeposit}</td>
                            <td>{item.products.length}</td>
                            <td>
                                <Link to={`/profile/${item._id}`} className='link'>
                                <span className='btn-c'>Xem chi tiết</span>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
