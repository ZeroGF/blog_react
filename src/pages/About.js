import React, { useState } from "react";
import { Row, Col, Icon, Affix, Avatar } from "antd";
import Author from "../components/Author";
import avatar from "../static/imgs/avatar.jpg";
export default function About() {
  return (
    <Row className="comm-main " type="flex" justify="center">
      <Col
        className="comm-left animated fadeInUp"
        xs={24}
        sm={24}
        md={16}
        lg={18}
        xl={16}
      >
        <div className="card about">
          <h2>关于我</h2>
          <p>名称：咖啡逗</p>
          <p>介绍：静守时光，以待流年。</p>
          <p>网址：http://kingsman96.top</p>
          <p>
            头像：
            <a
              href="http://kingsman96.top/upload/images/avatar.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar
                size={60}
                src="http://kingsman96.top/upload/images/avatar.png"
              />
            </a>
          </p>
          <br />
          <br />
          <h2>关于小站 </h2>
          <p>个人小站，瞎玩玩，倒腾倒腾，随便写点什么。</p>
          <p>前端使用了react全家桶开发,ui库是antd。</p>
          <p>后端使用是koa2+mongodb。部署在腾讯云上!</p>
        </div>
      </Col>
      <Col
        className="comm-right animated fadeInUp"
        xs={0}
        sm={0}
        md={7}
        lg={5}
        xl={5}
      >
        <Author />
      </Col>
    </Row>
  );
}
