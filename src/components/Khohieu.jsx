import React, { useState } from 'react';
import axios from 'axios';

export default function Khohieu() {
    const [imageData, setImageData] = useState('');
  const [text, setText] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    console.log(imageData)
    axios
      .post('http://localhost:8000/api/addTextToImage', {
        imageData: imageData,
        text: text,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>Add Text to Image</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      <input
        type="text"
        placeholder="Enter text to add to the image"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}
