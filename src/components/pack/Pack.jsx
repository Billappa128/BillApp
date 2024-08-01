import React from 'react'
import Pot from '../../images/Pot3.svg'
import styles from "./Pack.module.css"
import axios from "axios"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UpdateUser } from "../../context/AuthActions";

export default function Pack({ item }) {
    const { user, dispatch } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleClick = async (e) => {
        e.preventDefault();
        const token = user.token;

        // Kiểm tra xem có token không
        const buyPackage = {
            packageId: item._id,
        };
        if (token) {
            // Đính kèm token vào tiêu đề Authorization
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.post(apiUrl + '/package/buy', buyPackage);
                alert(`${res.data.message}`);

                // Gọi API thành công, thực hiện cập nhật thông tin User mới vào Context
                const newUser = await axios.get(apiUrl + `/user/` + user._id)
                // Lấy thông tin User mới từ server bằng API hoặc dispatch action để cập nhật thông tin User
                // Ví dụ: const newUser = await fetchNewUserData(token);
                // Sau đó cập nhật thông tin User vào Context
                dispatch(UpdateUser(newUser.data));

                // Nếu có dữ liệu User mới từ server, cập nhật thông tin User vào Context bằng action "UPDATE_USER"
                // dispatch(UpdateUser(newUser));

                // Sau đó cập nhật thông tin User vào localStorage
                localStorage.setItem("user", JSON.stringify(newUser));

            } catch (err) {
                // Xử lý lỗi
            }
        }
    };

    return (
        <div>
            <div className={`col-12 item ${styles.setWidth}`} >
                <div className={`card-body ${styles.cardPack}`}>
                    <div className="pricing-badge text-end">
                        <span className="badge rounded-pill badge-light-primary">Mua nhiều
                            nhất</span>
                    </div>
                    <img src={Pot} className="mb-2"
                        alt="svg img" />
                    <h3>{item.name}</h3>
                    <p className="card-text"></p>
                    <div className="annual-plan">
                        <div className={`plan-price mt-2 ${styles.setPrice}`}>
                            <span
                                className="pricing-basic-value fw-bolder">{`${item.price}`}</span>
                            <sup className={`font-medium-1 fw-bold`}>K</sup>
                            <sub className={`pricing-duration font-medium-1 fw-bold ${styles.donvi}`}>/
                                {item.duration}</sub>
                        </div>
                        <small className="annual-pricing d-none text-muted"></small>
                    </div>
                    <ul className="list-group list-group-circle text-start align-items-start">
                        {item.desc.map((item, index) => (
                            <li key={index} className={`list-group-item my-1 w-100 text-start ${styles.bgN}`}>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button
                        className="btn-c  w-100 btn-primary mt-2 waves-effect waves-float waves-light"
                        onClick={handleClick}
                    >Đăng ký gói</button>
                </div>
            </div>
        </div>
    )
}
