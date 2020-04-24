import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import marked from "marked";
import "../static/css/articleDetail.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import http from "../config/apiUrl";

const { Option } = Select;
const { TextArea } = Input;

function ArticleDetail(props) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(1); //选择的文章类别

  useEffect(() => {
    getTypeInfo();
    //获得文章ID
    let tmpId = props.match.params.id;
    if (tmpId) {
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);
  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: http.getTypeInfo,
      header: { "Access-Control-Allow-Origin": "*" },
      withCredentials: true,
    }).then((res) => {
      if (res.data.code === 401) {
        localStorage.removeItem("openId");
        props.history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const selectType = (val) => {
    setSelectType(val);
  };
  //保存文章的方法
  const saveArticle = () => {
    // markedContent(); //先进行转换

    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }

    let dataProps = {}; //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId == 0) {
      console.log("articleId=:" + articleId);
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: http.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.data);
        if (res.data.code === 200) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "post",
        url: http.updateArticle,
        header: { "Access-Control-Allow-Origin": "*" },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.code === 200) {
          message.success("文章修改成功");
        } else {
          message.error("修改失败");
        }
      });
    }
  };

  const getArticleById = (id) => {
    axios(http.getArticleById + id, {
      withCredentials: true,
      header: { "Access-Control-Allow-Origin": "*" },
    }).then((res) => {
      let articleData = res.data.data[0];
      setArticleTitle(articleData.title);
      setArticleContent(articleData.article_content);
      let html = marked(articleData.article_content);
      setMarkdownContent(html);
      setIntroducemd(articleData.introduce);
      let tmpInt = marked(articleData.introduce);
      setIntroducehtml(tmpInt);
      setShowDate(articleData.addTime);
      setSelectType(articleData.typeId);
    });
  };

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
                placeholder="博客标题"
                size="large"
                value={articleTitle}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select onSelect={selectType} defaultValue={1} size="large">
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={6}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={20}
                value={articleContent}
                placeholder="文章内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>

        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button onClick={saveArticle} type="primary" size="large">
                {articleId == 0 ? "发布文章" : "更新文章"}
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                onChange={changeIntroduce}
                rows={4}
                value={introducemd}
                placeholder="文章简介"
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => setShowDate(dateString)}
                  size="large"
                  defaultValue={showDate}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default ArticleDetail;
