import React, { useState, useEffect } from "react";
import { Row, Col, Icon, Affix, Avatar } from "antd";
import Author from "../components/Author";
import Comment from "../components/Comment";
import http from "../config/http";

export default function Friends(props) {
  const [list, setList] = useState([
    {
      _id: 1,
      linkName: "蔡文峰个人博客",
      logo:
        "http://www.caiwenfeng.cn/wp-content/uploads/2020/03/wallhaven-455z94.jpg",
      link: "http://www.caiwenfeng.cn/",
      linkDesc: "既然选择了远方,便只顾风雨兼程。",
    },
    {
      _id: 2,
      linkName: "蝉時雨",
      logo: "https://cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/avatar.jpg",
      link: "https://chanshiyu.com/#/",
      linkDesc: "蝉鸣如雨 花宵道中",
    },
    {
      _id: 3,
      linkName: "樱花庄的白猫",
      logo: "https://view.2heng.xin/images/2018/03/27/avatar.jpg",
      link: "https://2heng.xin/",
      linkDesc: "樱花庄的白猫",
    },
    {
      _id: 4,
      linkName: "初之音",
      logo: "https://i.loli.net/2019/04/28/5cc57985cee35.jpg",
      link: "https://www.himiku.com/",
      linkDesc: "LOVE MIKU FOREVER.",
    },
    {
      _id: 5,
      linkName: "维基萌",
      logo:
        "https://www.wikimoe.com/content/templates/black_memory v1.1/about/about_tx.jpg",
      link: "https://www.wikimoe.com/",
      linkDesc: "萌即是正义！一名热爱acg的前端设计师的小站！",
    },
    {
      _id: 6,
      linkName: "Ailoli",
      logo: "https://static.ailoli.org/avatar/5.png",
      link: "https://www.ailoli.org/",
      linkDesc: "永远年轻，永远热泪盈眶",
    },
    {
      _id: 7,
      linkName: "Airing的小屋",
      logo: "https://airing.ursb.me/image/airing-face.png",
      link: "https://me.ursb.me/",
      linkDesc: "哲学系の程序员",
    },
    {
      _id: 8,
      linkName: "Minemine",
      logo: "https://ooo.0o0.ooo/2017/02/08/589ac86c22008.jpg",
      link: "https://minemine.cc/",
      linkDesc: "小姐姐的博客好漂亮(≧▽≦)",
    },
  ]);
  useEffect(() => {
    // getList();
  }, []);
  const getList = function () {
    http.get("/api/friend").then((res) => {
      if (res.status === 1) {
        console.log(res);
        setList(res.data.list);
      }
    });
  };
  return (
    <Row className="comm-main " type="flex" justify="center">
      <Col
        className="comm-left animated fadeInUp"
        xs={24}
        sm={24}
        md={16}
        lg={18}
        xl={16}
      >
        <div className="friends">
          {list.map((item, index) => {
            return (
              <div key={item._id} className="friends-item">
                <div className="left">
                  <a href={item.link} target="_blank" className="title">
                    {item.linkName}
                  </a>
                  <p className="desc">{item.linkDesc}</p>
                </div>
                <div className="right">
                  <Avatar icon="user" src={item.logo} size={60} />
                </div>
              </div>
            );
          })}
        </div>
        <Comment type="friend" />
      </Col>
      <Col
        className="comm-right animated fadeInUp"
        xs={0}
        sm={0}
        md={7}
        lg={5}
        xl={5}
      >
        <Author />
      </Col>
    </Row>
  );
}
