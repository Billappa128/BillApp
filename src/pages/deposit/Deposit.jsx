import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from "./Deposit.module.css"
import Popup from 'reactjs-popup';
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function Deposit() {
    const [menu, setMenu] = useState([])
    const [capcha, setCapcha] = useState(0)
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_URL_IMG;
    const apiUrl = process.env.REACT_APP_API_URL;
    const input = useRef()

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(apiUrl + "/info/")
            setMenu(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        function randomFiveDigitNumber() {
            const min = 10000;
            const max = 99999;
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            setCapcha(randomNumber)
          }
        fetchPosts()
        randomFiveDigitNumber()
    }, [apiUrl])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user.token;

        // Kiểm tra xem có token không
        const getDeposit = {
            user: user._id,
            amount: input.current.value,
            desc : capcha,
        };
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.post(apiUrl + '/deposit/', getDeposit);
                alert(`${res.data.message}. Vui lòng đăng nhập lại sau 5 phút để cập nhật số tiền`);
                window.location.replace("/deposit")
            } catch (err) {
                // Xử lý lỗi
            }
        }
    };
    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Gói Tài Khoản</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    {menu.map((item) => (
                        <div key={item._id} className={styles.card}>
                            <img src={`${PF}${item.icon}`} className={styles.img} alt="Banking" />
                            <div className={styles.cardBody}>
                                <h1 className={styles.title}>{item.title}</h1>
                                <p className={styles.subTitle}>{item.desc}</p>
                                <Popup trigger={<button className="btn-c"> Nạp tiền ngay</button>} modal>
                                    <div className={styles.info}>
                                        <img src={`${PF}${item.detail.img}`} alt='Tên NH' />
                                        <h1>Ngân hàng : <span>{item.detail.name}</span></h1>
                                        <h2>Số tài khoản : <span>{item.detail.stk}</span>  <button>Copy</button></h2>
                                        <h2>Người thụ hưởng : <span>{item.detail.author}</span></h2>
                                        <h2>Nội dung ck : <span>{capcha}</span></h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <input ref={input} type="text" id="form1Example1" className="form-control input-form" />
                                                <label className="form-label f-z-15" for="form1Example1">Nhập số tiền. Lưu ý 1 điểm = 1,000đ</label>
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col d-flex justify-content-center">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                                        <label className="form-check-label" for="form1Example3"> Bạn chắc chứ ? </label>
                                                    </div>
                                                </div>

                                            </div>

                                            <button type="submit" className="btn btn-primary btn-block btn-c">Tạo lệnh nạp tiền</button>
                                        </form>
                                    </div>
                                </Popup>
                            </div>
                        </div>
                    ))}
                </div>
                <section id="package bg1">
                    <div class="card bg1">
                        <div class="card-header">
                            <h4 class="card-title">Gói tài khoản đã đăng ký</h4>
                        </div>
                        <table id="table" class="table nowrap  w-100 bg1" >
                            <thead class="bg1">
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
