import React, { useState, useEffect } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import storage from "../config/storage";

import "../static/css/header.less";
import { Row, Col, Menu, Icon, Dropdown } from "antd";

const Header = (props) => {
  let history = useHistory();
  const [navArray, setNavArray] = useState([
    { name: "首页", icon: "home", path: "/" },
    { name: "收藏", icon: "profile", path: "/collect" },
    // { name: "咖啡杂谈", icon: "message", path: "/contact" },
    { name: "友链", icon: "instagram", path: "/friends" },
    { name: "关于", icon: "crown", path: "/about" },
  ]);
  const meau = storage.get("currentMeau") || "/index";
  const [current, setcurrent] = useState(meau);
  const handleClick = (e) => {
    setcurrent(e.key);
    storage.set("currentMeau", e.key);
    history.push(e.key);
  };

  const menu = (
    <Menu onClick={handleClick}>
      {navArray.map((item) => {
        return (
          <Menu.Item key={item.path}>
            <Icon type={item.icon} />
            {item.name}
          </Menu.Item>
        );
      })}
    </Menu>
  );
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={22} sm={12} md={10} lg={10} xl={16}>
          <Link to="/">
            <span className="header-logo">咖啡逗</span>
            <span className="header-txt">走在前端的小路上</span>
          </Link>
        </Col>

        <Col className="memu-div" xs={0} sm={12} md={14} lg={12} xl={6}>
          <Menu
            defaultSelectedKeys={[current]}
            mode="horizontal"
            onClick={handleClick}
          >
            {navArray.map((item) => {
              return (
                <Menu.Item key={item.path}>
                  <Icon type={item.icon} />
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
        <Col className="memu-div-mobile" xs={2}>
          <Dropdown overlay={menu} placement="bottomRight">
            <Icon style={{ fontSize: "20px" }} type="menu" />
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
