import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import { isEmpty, set } from "lodash";
import axiosInstance from "../request/axio";

const ImageUploadComp = () => {
  const [message, setMessage] = useState("please upload an image");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [file, setFile] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setMessage(`Selected file: ${e.target.files[0].name}`);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    
    // Validate file selection
    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }
    
    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSize) {
      setMessage("File size exceeds the limit of 5 MB");
      return;
    }
    
    // Validate file type (optional)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Please select a valid image file (JPEG, PNG, GIF)");
      return;
    }
      const formData = new FormData();
    formData.append("file", file);
    
    // Debug: Check what we're sending
    console.log('=== Frontend Debug ===');
    console.log('File to upload:', file);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    console.log('======================');
    
    try {
      const res = await axiosInstance.post("/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          );
        },      });
      // clear percentage after upload
      const { message, imageUrl } = res.data;
      setTimeout(() => {
        setUploadPercentage(0);
        setUploadedFile({ 
          filename: file.name, // Use original filename
          filePath: `http://localhost:5000${imageUrl}` // Construct full URL
        });
        setMessage(message || "File uploaded successfully");
      }, 5000);    } catch (error) {
      console.error('Upload error:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          setMessage(data.error || "Bad request");
        } else if (status === 500) {
          setMessage(data.error || "Server error, please try again later");
        } else {
          setMessage("An unexpected error occurred");
        }
      } else {
        setMessage("File upload failed - Network error");
      }
      setUploadPercentage(0);
    }
  };

  return (
    <Fragment>
      {message && <Message message={message} setMessage={setMessage} />}
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input type="file" className="form-control" onChange={onChange} />
        </div>
        <Progress percentage={uploadPercentage} />
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {isEmpty(uploadedFile) ? (
        <div className="mt-4">
          <h3>No file uploaded yet</h3>
        </div>
      ) : (
        <div className="mt-5 row">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.filename}</h3>
            <img
              src={uploadedFile.filePath}
              alt={uploadedFile.filename}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ImageUploadComp;
