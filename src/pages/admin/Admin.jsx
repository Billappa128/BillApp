import React, { useState } from 'react'
import styles from "./Admin.module.css"
import Menubar from '../../components/menubar/Menubar'
import Topbar from '../../components/topbar/Topbar'
import Footer from '../../components/footer/Footer'
import Deposit from '../../components/foradmin/deposit/Deposit'
import Manageruser from '../../components/foradmin/user/Manageruser'
import Notification from '../../components/noti/Notification'


export default function Admin() {
    const [toggle, setToggle] = useState(1)

    const handleToggle = (index) => {
        setToggle(index)
    }

    return (
        <div className={styles.home}>
            <div className={`${styles.left}`}>
                <Menubar />
            </div>
            <div className={`${styles.right} rightPage`}>
                <div className={styles.wrapper}>
                    <Topbar />
                    <div className={styles.bottomWrapper}>
                        <div className={styles.buttonTabs}>
                            <button className={toggle === 1 ? `btn-c ${styles.activeBtn}` : `btn-c`} onClick={() => handleToggle(1)}>Quản lí nạp tiền</button>
                            <button className={toggle === 2 ? `btn-c ${styles.activeBtn}` : `btn-c`} onClick={() => handleToggle(2)}>Quản lí User</button>
                            <button className={toggle === 3 ? `btn-c ${styles.activeBtn}` : `btn-c`} onClick={() => handleToggle(3)}>Quản lí thông báo</button>
                        </div>
                        <div className={styles.contentTabs}>
                            <div className={toggle === 1 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(1)}>
                                <Deposit />
                            </div>
                            <div className={toggle === 2 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(2)}>
                                <Manageruser />
                            </div>
                            <div className={toggle === 3 ? `${styles.content} ${styles.activeContent}` : `${styles.content}`} onClick={() => handleToggle(3)}>
                                <Notification />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>
        </div>
    )
}
