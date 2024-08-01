import React, { useState,useEffect } from 'react'
import styles from "./Service.module.css"
import Pack from '../../components/pack/Pack';
import axios from "axios"
export default function Service() {
    const [menu, setMenu] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get(apiUrl +"/package/")
          setMenu(res.data.sort((p1,p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt)
          }))
        }
        fetchPosts()
      }, [apiUrl])
    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                <h1 className={styles.title}>Gói Tài Khoản</h1>
                <div className={styles.line}></div>
                </div>
                <section id="pricing-plan">

                    <div className="text-center">
                        <h1 className="mt-5">Gói tài khoản</h1>
                        <p className="mb-2 pb-75">Chọn gói tài khoản phù hợp với nhu cầu của bạn để tiết kiệm nhiều chi phí
                            hơn.</p>
                        <div className={styles.bottomWrapper}>
                            <div className={styles.contentTabs}>
                                <div className={`${styles.content} ${styles.activeContent}`}>
                                    <div className={styles.menuPrice}>
                                        {menu.map((item, index) => (
                                            <Pack key={index} item={item} />
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </section>
                <section id="package bg1">
                    <div className="card bg1">
                        <div className="card-header">
                            <h4 className="card-title">Gói tài khoản đã đăng ký</h4>
                        </div>
                        <table id="table" className="table nowrap  w-100 bg1" >
                            <thead className="bg1">
                                <tr>
                                    <th>Id</th>
                                    <th>Tên gói</th>
                                    <th>Bill áp dụng</th>
                                    <th>Đã dùng</th>
                                    <th>Còn lại</th>
                                    <th>Thời gian mua</th>
                                    <th>Thời gian còn lại</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    )
}
