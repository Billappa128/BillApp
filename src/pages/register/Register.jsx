import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Register.module.css"
import Logo from "../../images/Logo.png"
import axios from 'axios';
import video from "../../images/video-bg.mp4"

export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const [processing, setProcessing] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (processing) return; // Ngăn người dùng nhấn liên tục

        setProcessing(true);
        try {
            const res = await axios.post(apiUrl+ "/auth/register", {
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
            });
            const inputUser = {
                email: email.current.value,
                password: password.current.value,
            }
            if (res.data) {
                const inputUserString = JSON.stringify(inputUser);
                localStorage.setItem('token', inputUserString);
            }
            res.data && window.location.replace("/login");
        } catch (err) {
            alert("Đã xảy ra lỗi, vui lòng thực hiện lại")
            setProcessing(false);
        }
    };
    return (
        <div className={`${styles.login} d-flex vh-100 vw-100`}>

            <div className={`${styles.logoBox} d-flex align-items-center justify-content-center`}>
                <img className={styles.logoImg} src={Logo} alt="logo" />
                <span className={styles.logoTitle}>Billgatesvn</span>
                <span className={styles.logoSubTitle}>.shop</span>
            </div>
            <div className={`${styles.left} col`}>
                <video autoPlay loop className={styles.videoBackground}>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className={`${styles.right} d-flex col-lg-4 align-items-center auth-bg p-5`}>
                <div className={`${styles.boxRight} col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto`}>
                    <h2 className={`${styles.wel} card-title fw-bold mb-1`}>Chào mừng đến với Billgatesvn.Shop! 👋</h2>
                    <p className="f-z-15 card-text mb-2">Vui lòng đăng nhập để sử dụng chức năng trên hệ thống</p>
                    <form onSubmit={handleSubmit} className={`${styles.form} f-z-15 auth-login-form mt-2 validation-login `}>
                        <div className="mb-1">
                            <label className="form-label" for="login">Username</label>
                            <input ref={username} className="input-form form-control" id="username" type="text" name="username"
                                placeholder="Nhập Username" autofocus tabindex="1" />
                        </div>
                        <div className="mb-1">
                            <label className="form-label" for="login">Email</label>
                            <input ref={email} className="input-form form-control" id="login" type="text" name="login"
                                placeholder="Nhập Email" autofocus tabindex="1" />
                        </div>
                        <div className="mb-1">
                            <div className="d-flex justify-content-between">
                                <label className="form-label" for="login-password">Mật khẩu</label>
                            </div>
                            <div className="input-group input-group-merge form-password-toggle">
                                <input ref={password} className="input-form form-control form-control-merge" id="password" type="password"
                                    name="password" placeholder="············" /><span
                                        className={`${styles.eye} input-group-text cursor-pointer`}><i class="fa-solid fa-eye"></i></span>
                            </div>
                        </div>

                        <button type='submit' className="btn-c btn w-100 mt-3" tabindex="4" disabled={processing}>
                            {processing ? "Đang xử lý..." : "Đăng kí"}
                        </button>
                    </form>
                    <p className={`${styles.bot} text-center mt-2`}><span>Bạn đã có tài khoản?</span>
                        <Link className='link' to={`/login`}>
                            <a
                                href="/"><span className={styles.ttk}>&nbsp;Đăng nhập</span>
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
