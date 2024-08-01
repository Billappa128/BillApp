import React from 'react'
import styles from "./Card.module.css"
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom"

export default function Card({ item, desc, popup, banking, checking, balance }) {
    return (
        <div className={styles.card}>
            <img src={item.img.logo} className={styles.img} alt="Banking" />
            <div className={styles.cardBody}>
                <h1 className={styles.title}>{item.name}</h1>
                <p className={styles.subTitle}>{desc}</p>
                {popup ? <Popup trigger={<button className="btn-c"> Nạp tiền ngay</button>} modal>
                    <div className={styles.info}>
                        <img src='https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-VietinBank-CTG-Ori.png' alt='Tên NH' />
                        <h1>Ngân hàng : <span>Vietinbank</span></h1>
                        <h2>Số tài khoản : <span>0708076323</span>  <button>Copy</button></h2>
                        <h2>Người thụ hưởng : <span>Username1</span></h2>
                    </div>
                </Popup> : ""}
                {banking ? <Link to={`/bill/banking/${item.short}`} className="link">
                    <button className="btn-c">Tạo bill ngay</button>
                </Link> : ""}
                {checking ? <Link to={`/bill/checking/${item.short}`} className="link">
                    <button className="btn-c">Tạo bill ngay</button>
                </Link> : ""}
                {balance ? <Link to={`/bill/balance/${item.short}`} className="link">
                    <button className="btn-c">Tạo bill ngay</button>
                </Link> : ""}
            </div>
        </div>
    )
}
