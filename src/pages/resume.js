import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Switch, Avatar } from "antd";
import Swiper from "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.min.css";
import "../public/style/pages/resume.css";
function Resume() {
  useEffect(() => {
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: true,
      loop: false,
      direction: "vertical",
      mouseWheel: true,
      pagination: {
        el: ".swiper-pagination",
        click: true,
      },
    });
  }, []);
  return (
    <div>
      <Head>
        <title>简历</title>
      </Head>
      <section className="resume">
        <div className="resume-swith">
          <Switch
            checkedChildren="中文"
            unCheckedChildren="english"
            defaultChecked
          />
        </div>
        <div className="swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide idx1">
              <Avatar
                size={200}
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586431258542&di=5d1f132ddcc45b8080e316eefd534e8f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201603%2F06%2F20160306130452_kTZdr.jpeg"
              />
              <div className="username">咖啡豆</div>
              <div className="introduce">前端开发工程师</div>
            </div>
            <div className="swiper-slide idx2">
              <div className="skill-circle">
                <ul className="out">
                  <li className="item">快应用</li>
                  <li className="item">angular</li>
                  <li className="item">webpack</li>
                  <li className="item">小程序</li>
                  <li className="item">flutter</li>
                  <li className="item">nodejs</li>
                  <li className="item">vue</li>
                  <li className="item">react</li>
                </ul>
                <ul className="inner">
                  <li className="inner-item">ts</li>
                  <li className="inner-item">pwa</li>
                  <li className="inner-item">rxjs</li>
                  <li className="inner-item">jest</li>
                </ul>
              </div>
            </div>
            <div className="swiper-slide idx3">33</div>
            <div className="swiper-slide idx4">44</div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>
    </div>
  );
}
export default Resume;
