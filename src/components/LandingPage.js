import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="landing_page">
        <div className="home_image">
          <img
            src="https://i.ibb.co/3RnbGyz/203-2033128-house-clipart-animated-gif-building-home-gif-transparent.png"
            alt="203-2033128-house-clipart-animated-gif-building-home-gif-transparent"
            width="400"
          />
        </div>

        <h1>الجار قبل الدار</h1>
        <p>أطلب استعارة من جيرانك او ساعدهم قد ماتقدر</p>
        <button className="showReqsBtn" onClick={() => navigate("/posts")}>
          <h1>
            <span>استعرض الطلبات</span>
          </h1>
        </button>
        <div className="carsoul">
          <div className="col">
            <p dir="rtl">عن عبد الله بن عمر -رضي الله عنهما- قال: قال رسول الله -صلّى الله عليه وسلّم-:</p>
            <h3 dir="rtl">(ما زالَ جِبْرِيلُ يُوصِينِي بالجارِ، حتَّى ظَنَنْتُ أنَّه سَيُوَرِّثُهُ).</h3>
          </div>
          <div className="col">
            <p dir="rtl">عن عبد الله بن عمرو بن العاص -رضي الله عنهما- قال: قال رسول الله صلّى الله عليه وسلّم:</p>
            <h3 dir="rtl">(خيرُ الأصحابِ عندَ اللهِ خيرُهم لصاحبِه، وخيرُ الجيرانِ عندَ اللهِ خيرُهم لجارِهِ).</h3>
          </div>
          <div className="col">
            <p dir="rtl">عن عائشة أم المؤمنين -رضي الله عنها- قالت:</p>
            <h3 dir="rtl">
              (قُلتُ يا رَسولَ اللهِ، إنَّ لي جَارَيْنِ فَإِلَى أيِّهِما أُهْدِي؟ قَالَ: إلى أقْرَبِهِما مِنْكِ بَابًا)
            </h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
