import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import {
  Row,
  Col,
  List,
  Input,
  Button,
  Skeleton,
  Comment,
  Icon,
  message,
} from "antd";
import Emoji from "./Emoji";
import "../static/css/comment.less";
import http from "../config/http";
export default function MyComment(props) {
  const [initLoading, setinitLoading] = useState(false);
  const { TextArea } = Input;
  const [username, setUsername] = useState("");
  const [email, seteMail] = useState("");
  const [link, setLink] = useState("");
  const [msg, setMsg] = useState("");
  const [list, setlist] = useState([
    {
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      username: "xxx",
      email: "xxxxxxx@qq.com",
      message: "好的好的很好的好的很好的和好的好的",
      type: "",
      link: "",
      star: 1,
      loading: false,
      addDate: "2020-2-2",
    },
    {
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      username: "xxx",
      email: "xxxxxxx@qq.com",
      message: "好的好的很好的好的很好的和好的好的",
      type: "",
      link: "",
      star: 1,
      loading: false,
      addDate: "2020-2-2",
    },
  ]);

  useEffect(() => {
    getList({ status: 1, type: props.type });
  }, []);
  const getList = (params) => {
    http.get("/api/comments", { params }).then((res) => {
      if (res.status === 1) {
        setlist(res.data.list);
      }
    });
  };

  // 加载更多
  const loadMore = () => {};

  const onchangeUser = ({ target: { value } }) => {
    setUsername(value);
  };
  const onchangeEmail = ({ target: { value } }) => {
    seteMail(value);
  };
  const onchangeLink = ({ target: { value } }) => {
    setLink(value);
  };
  const onchangeMsg = ({ target: { value } }) => {
    setMsg(value);
  };
  const inputMessage = (val) => {
    let obj = msg + val;
    setMsg(obj);
  };
  // 获取随机头像
  const handleGetAvatar = async () => {
    let imgavatar = "";
    let res = await axios.get(
      "https://api.uomg.com/api/rand.avatar?format=json"
    );
    if (res.data.code === 1) {
      imgavatar = res.data.imgurl;
    }
    return imgavatar;
  };
  const handleSubmit = async () => {
    let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (username == "") {
      message.warning("昵称不能为空");
      return;
    }
    if (!emailReg.test(email)) {
      message.warning("电子邮箱格式错误");
      return;
    }
    if (msg == "") {
      message.warning("评论内容不能为空");
      return;
    }

    let avatar = await handleGetAvatar();
    let params = {
      type: props.type,
      username,
      message: msg,
      email,
      avatar,
      addDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };
    http.post("/api/comments/create", params).then((res) => {
      if (res.status === 1) {
        message.success("提交成功，等待博主审核");
        setUsername("");
        seteMail("");
        setLink("");
        setMsg("");
      }
    });
  };
  return (
    <div className="comment">
      <div className="comment-editor">
        <h4>
          添加新评论 <span className="note">评论需要审核后即可展示</span>
        </h4>
        <div className="comment-editor-inputbox">
          <Input
            allowClear
            value={username}
            onChange={onchangeUser}
            placeholder="用户昵称"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <Input
            allowClear
            value={email}
            onChange={onchangeEmail}
            placeholder="电子邮箱（选填填，将保密）"
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
          <Input
            allowClear
            value={link}
            onChange={onchangeLink}
            placeholder="博客网址（选填）"
            prefix={<Icon type="link" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        </div>
        <TextArea
          value={msg}
          onChange={onchangeMsg}
          placeholder="输入你的评论..."
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div className="comment-editor-tool">
          <Emoji inputMessage={inputMessage} />
          <Button onClick={handleSubmit} type="primary">
            提 交
          </Button>
        </div>
      </div>
      <List
        className="demo-loadmore-list"
        header={
          <div>
            <span>评论列表：{list.length}</span>
          </div>
        }
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <Comment
                author={<a target="_blank">{item.username}</a>}
                avatar={item.avatar}
                content={item.message}
                datetime={item.addDate}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}
