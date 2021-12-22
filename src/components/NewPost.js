import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
const NewPost = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);

  const add_new_post = async (e) => {
    try {
      e.preventDefault();
      if (!e.target.title.value || !e.target.desc.value || !e.target.category.value) {
        setErr("Kindly fill all the inputs");
      } else {
        setErr("");
        const result = await axios.post(`${BASE_URL}/post`, {
          title: e.target.title.value,
          desc: e.target.desc.value,
          category: e.target.category.value,
          duration: e.target.duration.value,
          img: images,
        });
        console.log(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    const dataType = image.name.match(/\.(jpe?g|png|gif)$/gi);
    if (image == null || dataType == null) return;
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadImamge = uploadBytesResumable(storageRef, image);
    uploadImamge.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadImamge.snapshot.ref).then((url) => {
          setImages([...images, url]);
          console.log(url);
        });
      }
    );
  };

  useEffect(() => {
    setProgress(0);
  }, [images]);
  return (
    <>
      <Navbar />
      <div className="sign_form">
        <h1>Add Post</h1>

        <form onSubmit={add_new_post} className="addpost">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
          <label htmlFor="desc">Description</label>
          <textarea type="text" name="desc" />
          <label htmlFor="category">Category</label>
          <select name="category">
            <option value="tools">أدوات منزلية</option>
            <option value="furniture">أثاث</option>
            <option value="food">مواد غذائية</option>
            <option value="other">أخرى</option>
          </select>
          <label htmlFor="duration">Duration</label>
          <select name="duration">
            <option value="1">دقيقة 30</option>
            <option value="2">ساعة</option>
            <option value="3">ساعتين</option>
            <option value="4">يوم</option>
            <option value="5">يومين</option>
            <option value="6">تبرع لوجه الله</option>
          </select>
          <br />
          <div className="upload">
            <input
              type="file"
              accept=".gif,.jpg,.jpeg,.png"
              onChange={(e) => {
                uploadPictures(e);
              }}
              id="img"
              style={{ display: "none" }}
            />
            <label htmlFor="img">Upload Images</label>
            {!(progress == 0) ? <p>Uploading {progress}%</p> : null}
            <br />
          </div>
          <div className="imagesPost">
            {images?.map((image) => (
              <img src={image} width="80px" height="80px" />
            ))}
          </div>
          <br />
          <button type="submit">Add Post</button>
        </form>
        <p>{err}</p>

        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default NewPost;
