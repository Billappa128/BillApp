import React from 'react'
import styles from "./Icontext.module.css"

export default function Icontext({ icon, text }) {
    return (
        <div>
            <div className={`${styles.iconText}`}>
                <i className={`${styles.icon} fa-solid ${icon}`}></i>
                <span className={`${styles.text}`}>{text}</span>
            </div>
        </div>
    )
}
