import React, { useState, useRef } from 'react'
import styles from "./Bidvchecking.module.css"
import html2canvas from 'html2canvas';
import { songMappings, wifiMappings, images } from '../../../data';
import logo from "../../../images/Logo.png"
import Pin from "../../../images/pin/pin1.png"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import diacritics from 'diacritics';
import "react-datepicker/dist/react-datepicker.css";
import { handleSubmit } from '../../../utils';
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export default function Bidvchecking() {
    const [processing, setProcessing] = useState(false);
    const { user, dispatch } = useContext(AuthContext);
    const componentRef = useRef(null);
    const copyRef = useRef(null);


    // -------Thay Hinh Nen
    const [selectedImage, setSelectedImage] = useState('image1');

    const imageOptions = [
        { value: 'image1', label: 'Hình Nền 1', path: images.bidvchecking },
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

    const handleTimeChange = (time, index) => {
        setForms((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[index].selectedTime = time; // Cập nhật selectedTime của form tương ứng
          const formattedTime = time ? format(new Date(time), "HH:mm") : "";
          updatedForms[index].time = formattedTime; // Cập nhật trường time của form tương ứng
          return updatedForms;
        });
      };

    const [forms, setForms] = useState([
        {
            date: new Date(),
            time: "",
            receiverAccount: "",
            description: "",
            amountNumber: 0,
            colorAmount : true,
            formattedAmount: "",
            selectedTime: null,
            selectedDate: null,
        },
    ]);

    const removeForm = (index) => {
        if (forms.length === 1) {
          // Nếu chỉ còn một form thì không cho xóa
          return;
        }
      
        setForms((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms.splice(index, 1); // Xóa form có index tương ứng
          return updatedForms;
        });
      };

    const addNewForm = () => {
        setForms((prevForms) => [
            ...prevForms,
            {
                date: new Date(),
                time: "",
                receiverAccount: "",
                description: "",
                amountNumber: 0,
                colorAmount : true,
                formattedAmount: "",
            },
        ]);
    };
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;

        if (name === "amountNumber") {
            const amount = parseFloat(value.replace(/,/g, ""));
            const formattedAmount = isNaN(amount) ? "" : new Intl.NumberFormat("en-US").format(amount);

            setForms((prevForms) => {
                const updatedForms = [...prevForms];
                updatedForms[index][name] = value;
                updatedForms[index].formattedAmount = formattedAmount;
                return updatedForms;
            });
        } else {
            // For other fields, just update their values without changing formattedAmount
            setForms((prevForms) => {
                const updatedForms = [...prevForms];
                updatedForms[index][name] = value;
                return updatedForms;
            });
        }
    };

    const handleColorChange = (e, index) => {
        const { checked } = e.target;
        setForms((prevForms) => {
          const updatedForms = [...prevForms];
          updatedForms[index].colorAmount = checked;
          return updatedForms;
        });
      };

    const handleCombinedSubmit = async () => {
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

    function formatDate(inputDate) {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const dateObject = new Date(inputDate);
      
        // Kiểm tra xem định dạng chuỗi đầu vào có hợp lệ hay không
        if (isNaN(dateObject)) {
          throw new Error("Invalid date format. Input date must be in the format 'yyyy-MM-dd'");
        }
      
        // Định dạng lại chuỗi ngày tháng theo yêu cầu (yyyy-MM-dd)
        const formattedDate = format(dateObject, 'dd-MM-yyyy');
        return formattedDate;
      }
      

    return (
        <div>
            <div className="content-body pb-5">
                <div className={styles.subContent}>
                    <h1 className={styles.title}>Bill Chuyển tiền</h1>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.optionTaskbar}>
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
                        </div>
                        {forms.map((form, index) => (
                            <form key={index}>
                                <h1>Form ||| Lưu ý nhập giá tiền sau cùng</h1>
                                <div className="row mb-4">
                                    <div className="col">
                                        <div className="form-outline">
                                            <input
                                                type="date"
                                                id="form6Example1"
                                                placeholder="18/09/2023"
                                                className={`form-control ${styles.inputCus}`}
                                                name="date"
                                                value={form.date}
                                                onChange={(e) => handleInputChange(e, index)}
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
                                                value={form.time}
                                                onChange={(e) => handleInputChange(e, index)}
                                            />
                                            <label className="form-label" htmlFor="test111">
                                                Chọn giờ ở đây :
                                            </label>
                                            <DatePicker
                                                style={{ display: "none" }}
                                                id='test111'
                                                selected={form.selectedTime}
                                                onChange={(time) => handleTimeChange(time, index)}
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
                                                value={form.receiverAccount}
                                                onChange={(e) => handleInputChange(e, index)}
                                                id="form6Example1" placeholder='104877735670' className={`form-control ${styles.inputCus}`} />
                                            <label className="form-label" htmlFor="form6Example1">Số tài khoản</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                            <input type="text"
                                                name="amountNumber"
                                                value={form.amountNumber}
                                                onChange={(e) => handleInputChange(e, index)}
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
                                                value={form.description}
                                                onChange={(e) => handleInputChange(e, index)}
                                                id="form6Example1" placeholder='NGUYEN VAN A Chuyen tien' className={`form-control ${styles.inputCus}`} />
                                            <label className="form-label" htmlFor="form6Example1">Noi dung</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-outline">
                                        <input
                                                type="checkbox"
                                                checked={form.colorAmount}
                                                onChange={(e) => handleColorChange(e, index)}
                                            />
                                            <label className="form-label" htmlFor="form6Example1">Âm/Dương</label>
                                        </div>
                                    </div>
                                </div>
                                {forms.length > 1 && (
                                <button className="btn-c mb-4" type="button" onClick={() => removeForm(index)}>
                                    Xóa Form
                                </button>
                                )}
                            </form>
                        ))}

                        {/* Button để thêm form mới */}
                        <button type="button" className="btn-c btn-block mb-4" onClick={addNewForm}>
                            Thêm Form Mới
                        </button>
                        

                        {/* Nút submit chung */}
                        <button type='submit' onClick={handleCombinedSubmit} className="btn-c btn-block mb-4" tabindex="4" disabled={processing}>
                            {processing ? "Đang xử lý..." : "In bill ngay"}
                        </button>

                    </div>
                    <div ref={componentRef} className={`${styles.right} position-relative`}>
                        <img src={imageOptions.find((image) => image.value === selectedImage)?.path} alt={selectedImage} />
                        <div className={`${styles.boxContent} position-absolute`}>
                            {forms.map((item, index) => (
                                <div>
                                    <div className={`${styles.timeLine} `}>
                                        <i className="fa-solid fa-check-double mr-3"></i>
                                        {item.time}</div>
                                    <div className={`${styles.tabContent} my-3`} key={index}>
                                        <div>BIDV xin thông báo tới Quý khách</div>
                                        <div>Thời gian GD: <span className={`${styles.date}`}>{`${item.time} ${formatDate(item.date)}`}</span></div>
                                        <div>Tài khoản thanh toán: <span className={`${styles.receiverAccount}`}>{`${item.receiverAccount}`}</span></div>
                                        <div>Số tiền GD:
                                            {item.colorAmount && <span style={{color : "#d2af3e"}} className={`${styles.amountNumber}`}>{` +${item.formattedAmount} VND`}</span>}
                                            {!item.colorAmount && <span style={{color : "red"}} className={`${styles.amountNumber}`}>{` -${item.formattedAmount} VND`}</span>}
                                        </div>
                                        <div>Nội dung giao dịch: <span>{`${item.description}`}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`${styles.taskbar}`}>
                            <div className={`${styles.timePhone}`}>{forms[0].time}</div>
                            <div className={styles.taskbarRight}>
                                {imageName && <img className={`${styles.imageSong}`} src={imageName} alt={`WIFI${selectedOption}`} />}
                                {imageWifi && <img className={`${styles.imageWifi}`} src={imageWifi} alt={`WIFI${selectedOptionWifi}`} />}
                                <span className={`${styles.boxPin}`}>
                                    <div className={`pin-container position-relative ${styles.pinne}`}>
                                        <img className='position-absolute' src={Pin} alt='pin' />
                                        <div className="position-absolute" style={{ height: 6.5, width: `calc(${pinWidth} + 2px)`, backgroundColor: pinColor }}></div>
                                    </div>
                                </span>
                            </div>
                        </div>
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
