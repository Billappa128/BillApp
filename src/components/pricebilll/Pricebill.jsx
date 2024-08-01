import React, { useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import styles from "./Pricebill.module.css"
import { priceBanking, priceBalance, priceChecking } from '../../data';

export default function Pricebill({icon, text}) {
    const [toggle, setToggle] = useState(1)

    const handleToggle = (index) => {
        setToggle(index)
    }

    
    
    return (
        <Popup trigger={<div>
            <div className={`${styles.iconText}`}>
                <i className={`${styles.icon} fa-solid ${icon}`}></i>
                <span className={`${styles.text}`}>{text}</span>
            </div>
        </div>} modal>
            <div className={styles.bottomWrapper}>
                <div className={styles.buttonTabs}>
                    <button className={toggle === 1 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(1)}>Bill chuyển khoản</button>
                    <button className={toggle === 2 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(2)}>Bill biến động</button>
                    <button className={toggle === 3 ? `${styles.btn} ${styles.activeBtn}` : `${styles.btn}`} onClick={() => handleToggle(3)}>Bill số dư</button>
                </div>
                <div className={styles.contentTabs}>
                    <div className={toggle === 1 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(1)}>
                        <div className={styles.menuPrice}>
                            {priceBanking.map((item, index) => (
                                <div key={index}>
                                    {item.name} <span>{item.price}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={toggle === 2 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(2)}>
                        <div className={styles.menuPrice}>
                            {priceChecking.map((item, index) => (
                                <div key={index}>
                                    {item.name} <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={toggle === 3 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(3)}>
                        <div className={styles.menuPrice}>
                            {priceBalance.map((item, index) => (
                                <div key={index}>
                                    {item.name} <span>{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    )
}
