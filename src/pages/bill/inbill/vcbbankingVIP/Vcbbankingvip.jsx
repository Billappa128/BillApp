import React, { useState, useRef, useContext, useEffect } from 'react'
import { AuthContext } from "../../../../context/AuthContext";
import styles from "./Vcbbankingvip.module.css"
import VCB1 from "../../../../images/billbanking/vcb/v1.jpg"
import html2canvas from 'html2canvas';
import { nameBank, songMappings, wifiMappings , songMappings1, wifiMappings1} from '../../../../data';
import logo from "../../../../images/Logo.png"
import Pin from "../../../../images/pin/pin1.png"
import DatePicker from "react-datepicker";
import randomstring from 'randomstring';
import { format } from 'date-fns';
import diacritics from 'diacritics';
import "react-datepicker/dist/react-datepicker.css";
import { handleSubmit } from '../../../../utils';

export default function Vcbbankingvip() {
    const [processing, setProcessing] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const [formattedAmount, setFormattedAmount] = useState("");
    const [amountNumber, setAmountNumber] = useState("")
    const componentRef = useRef(null);
    const copyRef = useRef(null);

    const [selectedBank, setSelectedBank] = useState('Techcombank'); // State lưu trữ tên ngân hàng được chọn

    const handleSelectChange = (event) => {
        setSelectedBank(event.target.value); // Cập nhật tên ngân hàng được chọn
    };

    const selectedBankData = nameBank.find((bank) => bank.name === selectedBank); // Tìm dữ liệu ngân hàng tương ứng với tên ngân hàng được chọn

    // Ramdom
    const randomNumericString = randomstring.generate({
        length: 10,
        charset: 'numeric', // Chỉ sử dụng các ký tự số (0-9)
    });

    // -------Thay Hinh Nen
    const [selectedImage, setSelectedImage] = useState('image1');

    const imageOptions = [
        { value: 'image1', label: 'Hình Nền 1', path: VCB1 },
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

    const imageName = songChecked && selectedOption && (selectedImage === 'image1' || selectedImage === 'image2') ? songMappings[selectedOption] : songMappings1[selectedOption];
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

    const imageWifi = wifiChecked && selectedOptionWifi && (selectedImage === 'image1' || selectedImage === 'image2') ? wifiMappings[selectedOptionWifi] : wifiMappings1[selectedOptionWifi];

    // -------SÓNG WIFI


    // ---------PIn
    const [pinPercentage, setPinPercentage] = useState(0);

    const handlePinPercentageChange = (e) => {
        const percentage = parseInt(e.target.value);
        setPinPercentage(percentage);
    };

    const pinWidth = `${pinPercentage}%`;
    const pinColor = (pinPercentage < 20) ? "#ff3737" : ((selectedImage === 'image1' || selectedImage === 'image2') ? "#FFF" : "#000");


    // --------HẾT PIN 

    const [formState, setFormState] = useState({
        date: "",
        time: "",
        transactionCode: randomNumericString,
        receiverAccount: "",
        receiverName: "",
        description: "",
    });

    const { date, time, transactionCode, receiverAccount, receiverName, description } = formState;

    // Set date
    // const formattedDate = date ? format(new Date(date), 'dd/MM/yyyy') : '';
    const getFormattedDate = (dateString) => {
        if (!dateString) return '';
    
        const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const date = new Date(dateString);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = String(date.getDate()).padStart(2, '0'); // Định dạng ngày thành chuỗi với 2 chữ số, thêm '0' phía trước nếu cần
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Định dạng tháng thành chuỗi với 2 chữ số, thêm '0' phía trước nếu cần
        const year = date.getFullYear();
    
        return `${dayOfWeek} ${dayOfMonth}/${month}/${year}`;
    };


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


    const handleInputAmount = (e) => {
        const amount = parseFloat(e.target.value.replace(/,/g, "")); // Chuyển đổi giá trị thành số và loại bỏ dấu phẩy
        const formattedAmount = isNaN(amount) ? "" : new Intl.NumberFormat("en-US").format(amount); // Định dạng giá trị có dấu phẩy
        setFormattedAmount(formattedAmount); // Cập nhật giá trị đã định dạng
        setAmountNumber(e.target.value)
    };

    // Hàm trả về đối tượng chứa các thuộc tính CSS tùy chỉnh
    const getH1Style = () => {
        return {
            color: selectedImage === 'image3' || selectedImage === 'image4' ? 'black' : 'white',
            // Các thuộc tính CSS khác (nếu có) có thể được thêm vào đây
        };
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

    const nameBankRef = useRef(null);

    useEffect(() => {
        const maxLength = 34
        const nameBankElement = nameBankRef.current; // Lấy phần tử DOM từ ref
        const lenghtNameBank = nameBankElement?.innerText.length
        console.log(lenghtNameBank)
        if (lenghtNameBank > maxLength) {
            nameBankElement.style.top = '652px'; // Điều chỉnh top thành 500px khi nội dung vượt quá 20 kí tự
        } else {
            nameBankElement.style.top = '672px'; // Đặt lại top về 515px khi nội dung không vượt quá 20 kí tự
        }
      }, [selectedBankData]);

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
                        <span  className={`${styles.date} position-absolute`}>{`${time} ${getFormattedDate(date)}`}</span>
                        <span style={getH1Style()} className={`${styles.transactionCode} position-absolute`}>{transactionCode}</span>
                        <span style={getH1Style()} className={`${styles.receiverAccount} position-absolute`}>{receiverAccount}</span>
                        <span style={getH1Style()} className={`${styles.receiverName} position-absolute text-uppercase`}>{diacritics.remove(receiverName)}</span>
                        <span className={`${styles.amountNumber} position-absolute`}>{`${formattedAmount} VND`}</span>
                        <span style={getH1Style()} className={`${styles.description} position-absolute`}>{diacritics.remove(description)}</span>
                        <div className={`${styles.taskbar}`}>
                            <div style={getH1Style()} className={`${styles.timePhone}`}>{time}</div>
                            <div className={styles.taskbarRight}>
                                {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
                                {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
                                <span className={`${styles.boxPin}`}>
                                    <div className={`pin-container position-relative ${styles.pinne}`}>
                                        <img className='position-absolute' src={Pin} alt='pin' />
                                        <div className="position-absolute" style={{ height: 11, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
                                    </div>
                                </span>
                            </div>

                        </div>

                        {selectedBankData && <span ref={nameBankRef} style={getH1Style()} className={`${styles.nameBank} position-absolute`}>{`${selectedBankData.vcbname}`}<span className='text-uppercase'>{` (${selectedBankData.name})`}</span></span>}
                        <div ref={copyRef} className={styles.copy}>
                            <div>Bản quyền thuộc về </div>
                            <img src={logo} alt='logo' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
