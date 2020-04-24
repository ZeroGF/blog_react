import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, List, Icon, Skeleton, Empty } from "antd";

import Author from "../components/Author";
import Tags from "../components/Tags";
import Comment from "../components/Comment";
import "../static/css/list.less";

import http from "../config/http";

const CollectList = (props) => {
  const type = "collect";
  const [isLoading, setisLoading] = useState(false);
  const [mylist, setMylist] = useState([]);
  //当我们进入页面的使用，就希望可以获得博客文章的列表，所以要使用useEffect()方法来进行操作。
  useEffect(() => {
    // getList();
  }, []);
  //得到文章列表
  const getList = () => {
    setisLoading(true);
    http.get("/api/favorite").then((res) => {
      setisLoading(false);
      if (res.status === 1) {
        let arr = [];
        res.data.list.forEach((item, idx) => {
          let find = arr.find((item2) => item.type == item2.type);
          // console.log(idx, find);
          if (find == undefined) {
            arr.push({ type: item.type, list: [item] });
          } else {
            arr.map((item3) => {
              if (item3.type == item.type) {
                item3.list.push(item);
              }
              return item3;
            });
          }
        });
        console.log(arr);
        setMylist(arr);
      }
    });
  };

  const handleStar = (item) => {
    http
      .post("/api/favorite/update", { _id: item._id, star: item.star + 1 })
      .then((res) => {
        if (res.status === 1) {
          getList();
        }
      });
  };

  return (
    <div className="collectList">
      <Row className="comm-main" type="flex" justify="center">
        <Col
          className="comm-left animated fadeInUp"
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={16}
        >
          <div className="collectList-box">
            {mylist.length == 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              ""
            )}
            {mylist.map((listItem, index) => {
              return (
                <List
                  key={listItem.type}
                  size="small"
                  header={
                    <div className={"list-header" + index}>{listItem.type}</div>
                  }
                  itemLayout="vertical"
                  loading={isLoading}
                  dataSource={listItem.list}
                  renderItem={(item) => (
                    <List.Item>
                      <a
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="title">{item.title}</span>
                        <span className="desc">{item.desc}</span>
                      </a>

                      <span
                        onClick={() => {
                          handleStar(item);
                        }}
                        className="star"
                      >
                        <Icon type="like-o" />
                        {item.star}
                      </span>
                    </List.Item>
                  )}
                />
              );
            })}
          </div>
          <Comment type={type} />
        </Col>
        <Col
          className="comm-right animated fadeInUp"
          xs={0}
          sm={0}
          md={7}
          lg={6}
          xl={5}
        >
          <Author />
          <Tags />
        </Col>
      </Row>
    </div>
  );
};

export default CollectList;
