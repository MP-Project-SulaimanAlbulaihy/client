import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { UserContext } from "../Context/UserContext";
const NewPost = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [err, setErr] = useState("");
  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const { User, setUser } = useContext(UserContext);

  const { state } = useLocation();

  const add_new_post = async (e) => {
    try {
      e.preventDefault();
      if (!e.target.title.value || !e.target.desc.value || !e.target.category.value) {
        setErr("Kindly fill all the inputs");
      } else {
        setErr("");
        const result = await axios.post(
          `${BASE_URL}/post`,
          {
            title: e.target.title.value,
            desc: e.target.desc.value,
            category: e.target.category.value,
            duration: e.target.duration.value,
            status: state ? state : "post",
            img: images,
          },
          { headers: { Authorization: `Bearer ${User.token}` } }
        );
        console.log(result.data);
        navigate("/");
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
      <div className="add_post" dir="rtl">
        {state == "request" ? <h1>طلب استعارة</h1> : <h1>إضافة سلعة</h1>}
        <form onSubmit={add_new_post} className="addpost_form">
          <label htmlFor="title">عنوان السلعة</label>
          <input type="text" name="title" required />
          <label htmlFor="desc">الوصف</label>
          <textarea type="text" name="desc" required />
          <label htmlFor="category">تصنيف الطلب</label>
          <select name="category">
            <option value="أدوات منزلية">أدوات منزلية</option>
            <option value="أثاث">أثاث</option>
            <option value="مواد غذائية">مواد غذائية</option>
            <option value="أخرى">أخرى</option>
          </select>
          <label htmlFor="duration">مدة الإستعارة</label>
          <select name="duration">
            <option value="دقيقة 30">دقيقة 30</option>
            <option value="ساعة">ساعة</option>
            <option value="ساعتين">ساعتين</option>
            <option value="يوم">يوم</option>
            <option value="يومين">يومين</option>
            <option value="تبرع لوجه الله">تبرع لوجه الله</option>
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
            <label htmlFor="img">تحميل صور</label>
            {!(progress == 0) ? (
              <div className="progress">
                <p>Uploading {progress}%</p>
              </div>
            ) : null}
          </div>
          <div className="imagesPost">
            {images?.map((image) => (
              <img src={image} width="80px" height="80px" />
            ))}
          </div>
          <br />
          <p>{err}</p>
          <div className="add_form_btns">
            <button
              type="button"
              onClick={() => {
                navigate("/posts");
              }}
            >
              تراجع
            </button>
            {state == "request" ? <button type="submit" id="add_btn_page">طلب السلعة</button> : <button type="submit" id="add_btn_page">عرض السلعة</button>}
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPost;
