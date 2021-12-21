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
      const result = await axios.post(`${BASE_URL}/post`, {
        mobileOrUsername: e.target.mobileOrUsername.value,
        password: e.target.password.value,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPictures = (e) => {
    let image = e.target.files[0];
    if (image == null) return;
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
    console.log("images effected ", images);
    setProgress(0)
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
          <label htmlFor="duration">Duration</label>
          <input type="text" name="duration" />
          <div className="upload">
            <input
              type="file"
              onChange={(e) => {
                uploadPictures(e);
              }}
              id="img"
              style={{ display: "none" }}
            />
            <label for="img">Upload Images</label>

            {!(progress == 0) ? <p>Uploading {progress}%</p> : null}<br/>
          </div>
          <div className="imagesPost">
            {images?.map((image) => (
              <img src={image} width="80px" height="80px" />
            ))}
          </div>
          <button type="submit">Add Post</button>
        </form>
        {/* <p>{err}</p> */}

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
