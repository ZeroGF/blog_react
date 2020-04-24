import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, List, Icon, Skeleton } from "antd";

import Author from "../components/Author";
import Tags from "../components/Tags";
import "../static/css/list.less";

import http from "../config/http";

const PageList = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [mylist, setMylist] = useState([]);
  //当我们进入页面的使用，就希望可以获得博客文章的列表，所以要使用useEffect()方法来进行操作。
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    setisLoading(true);
    http
      .get("/api/articles", { params: { pageSize, currentPage } })
      .then((res) => {
        setisLoading(false);
        if (res.status === 1) {
          setMylist(res.data.list);
        }
      });
  };

  return (
    <div className="articleList">
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-right" xs={24} sm={24} md={16} lg={18} xl={16}>
          <div>
            <List
              itemLayout="vertical"
              loading={isLoading}
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item>
                  <Link to={"/detail/" + item._id}>
                    <div className="list-title">{item.title}</div>{" "}
                  </Link>
                  <div className="list-icon">
                    <span>
                      <Icon type="calendar" /> {item.addDate}
                    </span>
                    <span>
                      <Icon type="folder" /> 视频教程
                    </span>
                    <span>
                      <Icon type="fire" /> {item.read}人
                    </span>
                  </div>
                  <div className="list-pic">
                    <img src={item.pic} alt="" srcset="" />
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  ></div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col className="comm-left" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Tags click={getList} />
        </Col>
      </Row>
    </div>
  );
};

export default PageList;
