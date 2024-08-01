import React from 'react'
import styles from "./Bankingbill.module.css"
import Card from '../../components/card/Card'
import { banking } from "../../data"
import { checking } from "../../data"
import { balance } from "../../data"
import { useLocation } from 'react-router-dom';

export default function Bankingbill() {
    const location = useLocation();

    let dataToUse;
    let propToPass;
    if (location.pathname === "/bill/banking") {
        dataToUse = banking;
        propToPass = "banking";
    } else if (location.pathname === "/bill/checking") {
        dataToUse = checking;
        propToPass = "checking";
    } else if (location.pathname === "/bill/balance") {
        dataToUse = balance;
        propToPass = "balance";
    } else {
        // Đối với trường hợp không khớp với bất kỳ path nào thì bạn có thể xử lý hoặc hiển thị nội dung mặc định tại đây
        dataToUse = [];
    }
    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Bill Chuyển tiền</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    {dataToUse.map((item, index) => (
                        <Card key={index} item={item} banking={propToPass === "banking"} checking={propToPass === "checking"} balance={propToPass === "balance"} />
                    ))}
                </div>
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
