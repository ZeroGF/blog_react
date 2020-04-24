import React, { useState } from "react";
import { Input, Button, Spin, Card, message } from "antd";
import "antd/dist/antd.css";
import "../static/css/login.css";
import axios from "axios";
import http from "../config/apiUrl";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const checkLogin = () => {
    if (!username) {
      message.error("用户名不能为空");
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      return false;
    }
    let dataProps = {
      username: username,
      password: password,
    };
    setIsLoading(true);
    axios({
      method: "post",
      url: http.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.code === 200) {
        localStorage.setItem("openId", res.data.data);
        props.history.push("/index");
      } else {
        message.error("用户名密码错误");
      }
    });
  };
  return (
    <div className="login">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="blog admin" bordered={true} style={{ width: 400 }}>
          <Input
            placeholder="请输入用户名"
            size="large"
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br /> <br />
          <Input
            placeholder="请输入密码"
            size="large"
            id="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br /> <br />
          <Button size="large" type="primary" block onClick={checkLogin}>
            登 录
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
