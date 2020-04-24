import React, { useState } from "react";
import { Divider } from "antd";
import wx from "../static/imgs/pay.JPG";
import zfb from "../static/imgs/pay2.JPG";
export default function Reward() {
  const [idx, setIdx] = useState(1);
  const changeStyle = (val) => {
    setIdx(val);
  };
  return (
    <div className="card Reward">
      <Divider>打赏</Divider>

      <img src={idx === 1 ? wx : zfb} />
      <div className="Reward-tool">
        <div
          onClick={() => {
            changeStyle(1);
          }}
          className="wx"
        >
          微信
        </div>
        <div
          onClick={() => {
            changeStyle(2);
          }}
        >
          支付宝
        </div>
      </div>
    </div>
  );
}
