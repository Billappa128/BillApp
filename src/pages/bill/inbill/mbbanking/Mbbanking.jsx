import React, { useState, useRef } from 'react'
import styles from "./Mbbanking.module.css"
import html2canvas from 'html2canvas';
import { nameBank, songMappings, wifiMappings, images } from '../../../../data';
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import diacritics from 'diacritics';
import randomstring from 'randomstring';
import "react-datepicker/dist/react-datepicker.css";
import { handleSubmit } from '../../../../utils';
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

export default function Mbbanking() {
    const [processing, setProcessing] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const [formattedAmount, setFormattedAmount] = useState("");
    const [amountNumber, setAmountNumber] = useState("")
    const componentRef = useRef(null);
    const copyRef = useRef(null);

    const [selectedBank, setSelectedBank] = useState(''); // State lưu trữ tên ngân hàng được chọn

    const handleSelectChange = (event) => {
        setSelectedBank(event.target.value); // Cập nhật tên ngân hàng được chọn
    };

    const selectedBankData = nameBank.find((bank) => bank.name === selectedBank); // Tìm dữ liệu ngân hàng tương ứng với tên ngân hàng được chọn

    // Ramdom
    const randomNumericString = randomstring.generate({
        length: 12,
        charset: 'numeric', // Chỉ sử dụng các ký tự số (0-9)
      });

    // -------Thay Hinh Nen
    const [selectedImage, setSelectedImage] = useState('image1');

    const imageOptions = [
        { value: 'image1', label: 'Hình Nền 1', path: images.mbbanking6 },
        { value: 'image2', label: 'Hình Nền 2', path: images.mbbanking2 },
        { value: 'image3', label: 'Hình Nền 3', path: images.mbbanking3 },
        { value: 'image4', label: 'Hình Nền 4', path: images.mbbanking4 },
        { value: 'image5', label: 'Hình Nền 5', path: images.mbbanking5 },
        { value: 'image6', label: 'Hình Nền 6', path: images.mbbanking1 },
        { value: 'image7', label: 'Hình Nền 7', path: images.mbbanking7 },
        { value: 'image8', label: 'Hình Nền 8', path: images.mbbanking8 },
        { value: 'image9', label: 'Hình Nền 9', path: images.mbbanking9 },
        { value: 'image10', label: 'Hình Nền 10', path: images.mbbanking10 },
        { value: 'image11', label: 'Hình Nền 11', path: images.mbbanking11 },
        { value: 'image12', label: 'Hình Nền 12', path: images.mbbanking12 },
        { value: 'image13', label: 'Hình Nền 13', path: images.mbbanking13 },
        // Thêm các hình ảnh khác vào đây
    ];

    const handleImageChange = (e) => {
        setSelectedImage(e.target.value);
    };
    // --------Het Thay Hinh Nen

    //-------SÓNG ĐTH
    const [songChecked, setSongChecked] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const handleSongChange = (e) => {
        setSongChecked(e.target.checked);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const imageName = songChecked && selectedOption ? songMappings[selectedOption] : null;
    // -------SÓNG ĐTH

    //-------SÓNG WIFI
    const [wifiChecked, setWifiChecked] = useState(false);
    const [selectedOptionWifi, setSelectedOptionWifi] = useState('');

    const handleWifiChange = (e) => {
        setWifiChecked(e.target.checked);
    };

    const handleOptionChangeWifi = (e) => {
        setSelectedOptionWifi(e.target.value);
    };

    const imageWifi = wifiChecked && selectedOptionWifi ? wifiMappings[selectedOptionWifi] : null;

    // -------SÓNG WIFI


    // ---------PIn
    const [pinPercentage, setPinPercentage] = useState(0);

    const handlePinPercentageChange = (e) => {
        const percentage = parseInt(e.target.value);
        setPinPercentage(percentage);
    };

    const pinWidth = `${pinPercentage}%`;
    const pinColor = pinPercentage < 20 ? "#ff3737" : '#FFF';
    // --------HẾT PIN 

    const [formState, setFormState] = useState({
        date: "",
        time: "",
        transactionCode: randomNumericString,
        senderNumber: "",
        senderAccount: "",
        receiverAccount: "",
        receiverName: "",
        amountText: "",
        description: "",
    });

    const { date, time, transactionCode, senderNumber, senderAccount, receiverAccount, receiverName, amountText, description } = formState;

    // Set date
    const formattedDate = date ? format(new Date(date), 'dd/MM/yyyy') : '';
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };

    //Set time
    const [selectedTime, setSelectedTime] = useState(null);
    const handleTimeChange = (date) => {
        setSelectedTime(date);
        const formattedTime = date ? format(new Date(date), 'HH:mm') : '';
        setFormState((prevState) => ({
            ...prevState,
            time: formattedTime,
        }));
    };

    const getH1Style = () => {
        return {
            color: selectedImage === 'image2' || selectedImage === 'image6' || selectedImage === 'image10' ? 'white' : 'black',
            // Các thuộc tính CSS khác (nếu có) có thể được thêm vào đây
        };
    };

    const handleInputAmount = (e) => {
        const amount = parseFloat(e.target.value.replace(/,/g, "")); // Chuyển đổi giá trị thành số và loại bỏ dấu phẩy
        const formattedAmount = isNaN(amount) ? "" : new Intl.NumberFormat("en-US").format(amount); // Định dạng giá trị có dấu phẩy
        setFormattedAmount(formattedAmount); // Cập nhật giá trị đã định dạng
        setAmountNumber(e.target.value)
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (processing) return; // Ngăn người dùng nhấn liên tục

        setProcessing(true);
        copyRef.current.style.display = "none";
        const timestamp = Date.now(); // Lấy thời gian hiện tại dưới dạng timestamp
        const filename = `${timestamp}.png`; // Tạo tên file dựa trên timestamp
    
        html2canvas(componentRef.current).then(async (canvas) => {
          const image = canvas.toDataURL();
          const blob = await fetch(image).then((res) => res.blob());
          const formData = new FormData();
          formData.append("name", filename);
          formData.append('file', blob);
    
          // Gọi hàm handleSubmit từ utils.js và truyền các thông tin cần thiết
          await handleSubmit(formData, user, dispatch, filename, blob);
          setProcessing(false);
          // Các phần xử lý khác của handleFormSubmit
        });
        copyRef.current.style.display = "initial";
      };

    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Bill Chuyển tiền</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <form onSubmit={handleFormSubmit}>
                            <h1>Form chuyển khoản</h1>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="date"
                                            id="form6Example1"
                                            placeholder="18/09/2023"
                                            className={`form-control ${styles.inputCus}`}
                                            name="date"
                                            value={date}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="form6Example1">
                                            Ngày
                                        </label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input
                                            type="text"
                                            placeholder="20:37"
                                            className={`form-control ${styles.inputCus}`}
                                            name="time"
                                            value={time}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label" htmlFor="test111">
                                            Chọn giờ ở đây :
                                        </label>
                                        <DatePicker
                                            style={{ display: "none" }}
                                            id='test111'
                                            selected={selectedTime}
                                            onChange={handleTimeChange}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="HH:mm"
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="senderNumber"
                                            value={senderNumber}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='2301' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">STK người gửi</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="senderAccount"
                                            value={senderAccount}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='NGUYEN VAN A' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Tên người gửi</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="receiverAccount"
                                            value={receiverAccount}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='104877735670' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">STK người nhận</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="receiverName"
                                            value={receiverName}
                                            onChange={handleInputChange}
                                            id="form6Example2" placeholder='NGO LUU HONG NGOC' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example2">Tên người nhận</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="amountNumber"
                                            value={amountNumber}
                                            onChange={handleInputAmount}
                                            id="form6Example1" placeholder='30,000 VND' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Số tiền bằng SỐ</label>
                                    </div>
                                </div>
                               
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="description"
                                            value={description}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='NGUYEN VAN A Chuyen tien' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Noi dung</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-outline">
                                        <input type="text"
                                            name="transactionCode"
                                            value={transactionCode}
                                            onChange={handleInputChange}
                                            id="form6Example1" placeholder='1XQ6q-7jnO99587' className={`form-control ${styles.inputCus}`} />
                                        <label className="form-label" htmlFor="form6Example1">Mã GD</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col">
                                    <div className='d-flex align-items-start'>
                                        <label className='mr-3'>
                                            <input type="checkbox" checked={songChecked} onChange={handleSongChange} />
                                            Sóng điện thoại 1:
                                        </label>
                                        <select className={`${styles.selectCus}`} value={selectedOption} onChange={handleOptionChange}>
                                            <option value="">Chọn mức sóng</option>
                                            <option value="1">1 Vạch</option>
                                            <option value="2">2 Vạch</option>
                                            <option value="3">3 Vạch</option>
                                            <option value="4">4 Vạch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <select className='mb-3' value={selectedImage} onChange={handleImageChange}>
                                        <option value="">-- Chọn hình ảnh --</option>
                                        {imageOptions.map((image) => (
                                            <option key={image.value} value={image.value}>
                                                {image.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col">
                                    <div className='d-flex align-items-start'>
                                        <label className='mr-3'>
                                            <input type="checkbox" checked={wifiChecked} onChange={handleWifiChange} />
                                            Sóng Wifi :
                                        </label>
                                        <select className={`${styles.selectCus}`} value={selectedOptionWifi} onChange={handleOptionChangeWifi}>
                                            <option value="">Chọn mức sóng</option>
                                            <option value="1">1 Vạch</option>
                                            <option value="2">2 Vạch</option>
                                            <option value="3">3 Vạch</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className='d-flex align-items-center'>
                                        <div className='mr-3'>Chọn % Pin:</div>
                                        <input
                                            className={styles.inputPin}
                                            type="number"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={pinPercentage}
                                            onChange={handlePinPercentageChange}
                                        />

                                    </div>
                                </div>
                            </div>
                            <select className={`form-control ${styles.selectCus}`} value={selectedBank} onChange={handleSelectChange}>
                                <option value="">-- Chọn một ngân hàng --</option>
                                {nameBank.map((bank) => (
                                    <option key={bank.name} value={bank.name}>
                                        {bank.name}
                                    </option>
                                ))}
                            </select>
                            <button type='submit' className="btn-c btn-block mb-4" tabindex="4" disabled={processing}>
                            {processing ? "Đang xử lý..." : "In bill ngay"}
                            </button>
                        </form>
                    </div>
                    <div ref={componentRef} className={`${styles.right} position-relative`}>
                        <img src={imageOptions.find((image) => image.value === selectedImage)?.path} alt={selectedImage} />
                        <img src={images.conong} className={`${styles.conong} position-absolute`}  alt="conong" />
                        <span className={`${styles.date} position-absolute`}>{`${time}:17, ${formattedDate}`}</span>
                        <span className={`${styles.transactionCode} position-absolute`}>{`FT${transactionCode}`}</span>
                        <span className={`${styles.senderNumber} position-absolute`}>{`${senderNumber}`}</span>
                        <span className={`${styles.senderAccount} position-absolute text-uppercase`}>{diacritics.remove(senderAccount)}</span>
                        <span className={`${styles.receiverAccount} position-absolute`}>{receiverAccount}</span>
                        <span className={`${styles.receiverName} position-absolute text-uppercase`}>{diacritics.remove(receiverName)}</span>
                        <span style={getH1Style()} className={`${styles.amountNumber} position-absolute`}>{`${formattedAmount} VND`}</span>
                        <span className={`${styles.description} position-absolute`}>{diacritics.remove(description)}</span>
                        <div className={`${styles.taskbar}`}>
                            <div className={`${styles.timePhone}`}>{time}</div>
                            <div className={styles.taskbarRight}>
                                {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
                                {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
                                <span className={`${styles.boxPin}`}>
                                    <div className={`pin-container position-relative ${styles.pinne}`}>
                                        <img className='position-absolute' src={images.pin} alt='pin' />
                                        <div className="position-absolute" style={{ height: 11, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
                                    </div>
                                </span>
                            </div>

                        </div>

                        {selectedBankData && <span className={`${styles.nameBank} position-absolute`}>{`${selectedBankData.mbname}`}<span className='text-uppercase'>{` (${selectedBankData.name})`}</span></span>}
                        {selectedBankData && <img src={selectedBankData.icon} className={`${styles.iconBank} position-absolute`}  alt="iconBank" />}
                        <div ref={copyRef} className={styles.copy}>
                            <div>Bản quyền thuộc về </div>
                            <img src={images.logo} alt='logo' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
