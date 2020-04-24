import React, { useState, useEffect } from "react";
import "../static/css/ArticleList.css";
import { List, Row, Col, Modal, message, Button, Table } from "antd";
import axios from "axios";
import http from "../config/apiUrl";
const { confirm } = Modal;
const { Column, ColumnGroup } = Table;

function ArticleList(props) {
  const [list, setList] = useState([]);
  //当我们进入页面的使用，就希望可以获得博客文章的列表，所以要使用useEffect()方法来进行操作。
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: http.getArticleList,
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      setList(res.data.data);
    });
  };
  //修改文章
  const updateArticle = (id) => {
    props.history.push("/index/add/" + id);
  };

  //删除文章的方法
  const delArticle = (id) => {
    console.log(id);
    confirm({
      title: "确定要删除这篇博客文章吗?",
      okText: "确定",
      cancelText: "取消",
      content: "如果你点击确定按钮，文章将会永远被删除，无法恢复。",
      onOk() {
        axios(http.delArticle + id, { withCredentials: true }).then((res) => {
          message.success("文章删除成功");
          getList();
        });
      },
      onCancel() {
        message.success("没有任何改变");
      },
    });
  };
  return (
    <div>
      <Table dataSource={list}>
        <Column title="标题" dataIndex="title" key="title" />
        <Column title="类别" dataIndex="typeName" key="typeName" />
        <Column
          title="发布时间"
          dataIndex="addTime"
          key="addTime"
          render={(val) => <span>{val}</span>}
        />
        <Column title="浏览量" dataIndex="view_count" key="view_count" />
        <Column
          title="操作"
          render={(text, record) => (
            <span>
              <Button onClick={() => updateArticle(record.id)} type="primary">
                编辑
              </Button>
              <Button onClick={() => delArticle(record.id)} type="danger">
                删除
              </Button>
            </span>
          )}
        />
      </Table>
    </div>
  );
}

export default ArticleList;
