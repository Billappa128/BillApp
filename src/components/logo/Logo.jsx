import React from 'react'
import styles from "./Logo.module.css"
import logo from "../../images/Logo.png"

export default function Logo() {
    return (
        <div className={`${styles.logoBox} d-flex align-items-center justify-content-center`}>
            <img className={styles.logoImg} src={logo} alt="logo" />
            <div className={styles.titleLogo}>
                <span className={styles.logoTitle}>Billgates</span>
                <span className={styles.logoSubTitle}>.shop</span>
            </div>
        </div>
    )
}
