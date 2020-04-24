import React, { useState } from "react";
import { Avatar, Divider, Popover } from "antd";
import csdn from "../static/imgs/csdn.svg";

import "../static/css/author.less";
const Author = () => {
  return (
    <div className="card author-div comm-box">
      <div>
        <Avatar
          size={100}
          src="http://kingsman96.top/upload/images/avatar.png"
        />
      </div>
      <div className="author-introduction">
        前端开发程序猿
        <Divider>社交账号</Divider>
        <Popover content="我的Github">
          <a
            className="contact"
            target="_blank"
            href="https://github.com/ZeroGF"
          >
            <Avatar size={28} icon="github" className="account" />
          </a>
        </Popover>
        <Popover content="我的CSDN">
          <a
            className="contact"
            target="_blank"
            href="https://blog.csdn.net/zerogf"
          >
            <Avatar size={28} src={csdn} className="account" />
          </a>
        </Popover>
        <Popover content="我的知乎">
          <a
            className="contact"
            target="_blank"
            href="https://www.zhihu.com/people/ju-zi-wei-de-xia-tian-79"
          >
            <Avatar size={28} icon="zhihu" className="account" />
          </a>
        </Popover>
        <Popover className="contact" content="704440189@qq.com">
          <Avatar size={28} icon="mail" className="account" />
        </Popover>
      </div>
    </div>
  );
};

export default Author;
