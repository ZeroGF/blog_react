import React, { useState, useEffect, usH } from "react";
import { useHistory } from "react-router-dom";
import { Tag, Divider } from "antd";
import http from "../config/http";
import storage from "../config/storage";
import store from "../store";
export default function Tags(props) {
  let history = useHistory();
  const [list, setList] = useState([
    { _id: 1, name: "vue", color: "#336633" },
    { _id: 2, name: "html", color: "#3333CC" },
    { _id: 3, name: "css", color: "#6633CC" },
    { _id: 4, name: "javascript", color: "#993366" },
    { _id: 5, name: "es6", color: "#FFD700" },
    { _id: 6, name: "git", color: "#2E8B57" },
    { _id: 7, name: "webpack", color: "#B8860B" },
    { _id: 8, name: "nodejs", color: "#FA8072" },
  ]);
  useEffect(() => {
    getList();
  }, []);
  const getList = function () {
    http.get("/api/tag").then((res) => {
      if (res.status === 1) {
        setList(res.data);
      }
    });
  };
  const handleClick = function (name) {
    storage.set("filterTag", name);
    if (props.click) {
      //调用父组件方法
      props.click({
        pageSize: 10,
        currentPage: 1,
        tag: name,
      });
    } else {
      history.push("/index");
    }
    console.log(props);
  };
  return (
    <div className="card taglist">
      <Divider>标签</Divider>
      <span
        onClick={() => {
          handleClick(null);
        }}
      >
        <Tag>全部</Tag>
      </span>
      {list.map((item) => {
        return (
          <span
            style={{
              margin: "5px",
              display: "inline-block",
              cursor: "pointer",
            }}
            className="tag-item"
            key={item._id}
            onClick={() => {
              handleClick(item.name);
            }}
          >
            <Tag color={item.color}>{item.name}</Tag>
          </span>
        );
      })}
    </div>
  );
}
