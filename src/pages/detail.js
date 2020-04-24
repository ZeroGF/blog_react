import React, { useState, useEffect } from "react";
import { Row, Col, Icon, Affix, Divider } from "antd";
import Author from "../components/Author";
import Tags from "../components/Tags";
import Comment from "../components/Comment";
import Reward from "../components/Reward";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

import http from "../config/http";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";

const Detail = (props) => {
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [detailData, setDetailData] = useState(props);
  const [html, setHtml] = useState("");
  const [type, setType] = useState("aid");

  useEffect(() => {
    const id = props.match.params.id;
    setType("aid" + id);
    getDetail(id);
  }, []);
  // 获取详情信息
  const getDetail = function (id) {
    http.get("/api/articles/detail", { params: { _id: id } }).then((res) => {
      if (res.status === 1) {
        setDetailData(res.data.current);
        setHtml(marked(res.data.current.content));
        let prev1 = res.data.prev ? res.data.prev : null;
        let next1 = res.data.next ? res.data.next : null;
        setPrev(prev1);
        setNext(next1);
      }
    });
  };
  // 高亮

  const renderer = new marked.Renderer();

  // renderer.heading = function (text, level, raw) {
  //   const anchor = tocify.add(text, level);
  //   return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  // };
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const handlePrev = function () {
    getDetail(prev._id);
  };
  const handleNext = function () {
    getDetail(next._id);
  };
  const handleLike = function () {
    http
      .post("/api/articles/star", {
        _id: detailData._id,
        star: detailData.star + 1,
      })
      .then((res) => {
        if (res.status === 1) {
          let obj = JSON.parse(JSON.stringify(detailData));
          obj.star = Number(obj.star) + 1;
          setDetailData(obj);
        }
      });
  };

  return (
    <div className="articleDetail">
      <div
        style={{ display: prev ? "block" : "none" }}
        onClick={handlePrev}
        className="pagenav prev"
        title="prev"
      >
        <Icon type="double-left" />
      </div>
      <div
        style={{ display: next ? "block" : "none" }}
        onClick={handleNext}
        className="pagenav next"
        title="next"
      >
        <Icon type="double-right" />
      </div>
      <Row className="comm-main" type="flex" justify="center">
        <Col
          className="comm-left animated fadeInUp"
          xs={24}
          sm={24}
          md={16}
          lg={18}
          xl={14}
        >
          <div className="articleDetail-body">
            <h1 className="detailed-title">
              <Icon
                onClick={() => {
                  props.history.go(-1);
                }}
                title="返回列表"
                className="back"
                type="left"
              />
              {detailData.title}
            </h1>

            <div className="list-icon">
              <span>
                <Icon type="calendar" /> {detailData.addDate}
              </span>
              <span className="read">
                <Icon type="like-o" /> {detailData.star}
              </span>
              <span>
                <Icon type="eye" /> {detailData.read}
              </span>
            </div>

            <div
              className="detailed-content"
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
            <div className="detailed-tool">
              <div onClick={handleLike} className="detailed-tool-item">
                <Icon type="smile" />
                <span>{detailData.star}次点赞</span>
              </div>
            </div>
          </div>
          <Comment type={"aid" + props.match.params.id} />
        </Col>

        <Col className="comm-right " xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Reward />
          <Tags />
          <Affix offsetTop={20}>
            <div className="card  detailed-nav ">
              <Divider>目录</Divider>
              <MarkNav
                className="article-menu"
                source={detailData.content}
                headingTopOffset={30}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
