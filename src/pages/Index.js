import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, List, Icon, Avatar } from "antd";
// 组件
import Author from "../components/Author";
import Newest from "../components/Newest";
import Tags from "../components/Tags";
import Img from "../components/Img";
import store from "../store";
import http from "../config/http";
import storage from "../config/storage";

const Index = (props) => {
  const state = store.getState();
  const [mylist, setMylist] = useState(state.list);
  //订阅Redux的状态
  store.subscribe(storeChange);
  // state改变后，页面需要重新set值
  function storeChange() {
    const data = store.getState();
    setMylist(data.list);
  }
  // 一进入页面进行的操作
  useEffect(() => {
    let obj = { pageSize: state.pageSize, currentPage: state.currentPage };
    let tag = storage.get("filterTag");
    if (tag) {
      obj = Object.assign(obj, { tag });
    }
    getList(obj);
  }, []);
  // 获取列表
  const getList = function (params) {
    http
      .get("/api/articles", {
        params,
      })
      .then((res) => {
        if (res.status === 1) {
          const action = {
            type: "GET_LIST",
            value: res.data,
          };
          store.dispatch(action);
        }
      });
  };
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  return (
    <div>
      {/* 内容 */}
      <Row className="comm-main Index" type="flex" justify="center">
        <Col
          className="comm-left animated fadeInUp"
          xs={24}
          sm={24}
          md={16}
          lg={16}
          xl={16}
        >
          <List
            dataSource={mylist}
            itemLayout="vertical"
            pagination={{
              onChange: (page) => {
                let obj = { pageSize: state.pageSize, currentPage: page };
                getList(obj);
              },
              pageSize: state.pageSize,
              total: state.total,
            }}
            renderItem={(item) => (
              <List.Item
                key={item._id}
                actions={[
                  <IconText
                    type="calendar"
                    text={item.addDate}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    type="like-o"
                    text={item.star}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    type="eye"
                    text={item.read}
                    key="list-vertical-message"
                  />,
                ]}
                extra={<Img src={item.pic} />}
              >
                <List.Item.Meta
                  title={<Link to={"/detail/" + item._id}>{item.title}</Link>}
                  description={item.desc}
                />
              </List.Item>
            )}
          ></List>
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
          <Tags click={getList} />
          <Newest />
        </Col>
      </Row>
    </div>
  );
};

export default Index;
