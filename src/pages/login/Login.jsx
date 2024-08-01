import React, { useContext, useRef, useEffect, useState } from 'react';
import { AuthContext } from "../../context/AuthContext";
import styles from "./Login.module.css";
import { loginCall } from "../../apiCall"
import { Link } from 'react-router-dom';
import Logo from "../../images/Logo.png"

export default function Login() {
    const [processing, setProcessing] = useState(false);
    const email = useRef()
    const password = useRef()
    const { dispatch } = useContext(AuthContext)


    useEffect(() => {
        const token = localStorage.getItem('token');
        const inputUser = JSON.parse(token);
        if (token) {
            loginCall({ email: inputUser.email, password: inputUser.password }, dispatch)
            localStorage.removeItem('token')
        }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (processing) return; // Ngăn người dùng nhấn liên tục

        try {
            await loginCall({ email: email.current.value, password: password.current.value }, dispatch);
        } finally {
            setProcessing(false);
        }
    }
    return (
        <div className={`${styles.login} d-flex vh-100 vw-100`}>
            <div className={`${styles.logoBox} d-flex align-items-center justify-content-center`}>
                <img className={styles.logoImg} src={Logo} alt="logo" />
                <span className={styles.logoTitle}>Billgatesvn</span>
                <span className={styles.logoSubTitle}>.shop</span>
            </div>
            <div className={`${styles.left} col`}>
                <div className={`${styles.tag1} w-100 d-lg-flex align-items-center justify-content-center px-5`}>
                    <img className='img-fluid' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuEI5QY4LSQt-VQdDPty2-yI8nYnHlNiJEJg&s" alt="tag1" />
                </div>
            </div>
            <div className={`${styles.right} d-flex col-lg-4 align-items-center auth-bg p-5`}>
                <div className={`${styles.boxRight} col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto`}>
                    <h2 className={`${styles.wel} card-title fw-bold mb-1`}>Chào mừng đến với Billgatesvn.Shop! 👋</h2>
                    <p className="f-z-15 card-text mb-2">Vui lòng đăng nhập để sử dụng chức năng trên hệ thống</p>
                    <form onSubmit={handleSubmit} className={`${styles.form} f-z-15 auth-login-form mt-2 validation-login `}>
                        <div className="mb-1">
                            <label className="form-label" for="login">Email</label>
                            <input ref={email} className="input-form form-control" id="login" type="text" name="login"
                                placeholder="Nhập Email" autofocus tabindex="1" />
                        </div>
                        <div className="mb-1">
                            <div className="d-flex justify-content-between">
                                <label className="form-label" for="login-password">Mật khẩu</label><a
                                    href="/"><small>Quên mật
                                        khẩu?</small></a>
                            </div>
                            <div className="input-group input-group-merge form-password-toggle">
                                <input ref={password} className="input-form form-control form-control-merge" id="password" type="password"
                                    name="password" placeholder="············" /><span
                                        className={`${styles.eye} input-group-text cursor-pointer`}><i class="fa-solid fa-eye"></i></span>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="form-check d-flex align-items-center">
                                <input className="form-check-input" id="remember-me" type="checkbox"
                                    tabindex="3" name="remember" />
                                <label className="form-check-label ml-2" for="remember-me"> Ghi nhớ đăng nhập</label>
                            </div>
                        </div>
                        <button type='submit' className="btn-c btn w-100 mt-3" tabindex="4" disabled={processing}>
                            {processing ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                    </form>
                    <p className={`${styles.bot} text-center mt-2`}><span>Bạn chưa có tài khoản?</span>
                        <Link className='link' to={`/register`}>
                            <a
                                href="/"><span className={styles.ttk}>&nbsp;Tạo
                                    tài khoản</span>
                            </a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
