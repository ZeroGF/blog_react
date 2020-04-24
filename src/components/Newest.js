import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Divider, Icon } from "antd";
import http from "../config/http";
export default function Hot(props) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  const getList = function () {
    http.get("/api/articles/hot").then((res) => {
      if (res.status === 1) {
        setList(res.data);
      }
    });
  };

  return (
    <div className="card hotlist">
      <Divider>最新文章</Divider>
      {list.map((item) => {
        return (
          <div key={item._id} className="hotlist-item">
            <Avatar
              icon="user"
              size={50}
              src={
                item.pic || "http://kingsman96.top/upload/images/default.png"
              }
            />
            <div className="info">
              <div className="title">
                <Link to={"/detail/" + item._id}>{item.title}</Link>
              </div>
              <div>
                <span>
                  <Icon type="like-o" />
                  {item.star}
                </span>
                <span className="star">
                  <Icon type="eye" />
                  {item.read}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
