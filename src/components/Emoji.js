import React, { useState } from "react";
export default function Emoji(props) {
  const [showEmoji, setshowEmoji] = useState(false);
  const [emojis, setEmoji] = useState([
    { title: "HI", val: "|´・ω・)ノ" },
    { title: "开心", val: "ヾ(≧∇≦*)ゝ" },
    { title: "星星眼", val: "(☆ω☆)" },
    { title: "掀桌", val: "（╯‵□′）╯︵┴─┴" },
    { title: "流口水", val: "￣﹃￣" },
    { title: "捂脸", val: "(*/ω＼*)" },
    { title: "给跪", val: "∠( ᐛ 」∠)＿" },
    { title: "斜眼", val: "(๑•̀ㅁ•́ฅ)" },
    { title: "加油", val: "୧(๑•̀⌄•́๑)૭" },
    { title: "前方高能预警", val: "(ノ°ο°)ノ" },
    { title: "我从未见过如此厚颜无耻之人", val: "(´இ皿இ｀)" },
    { title: "吓死宝宝惹", val: "⌇●﹏●⌇" },
    { title: "已阅留爪", val: "(ฅ´ω`ฅ)" },
    { title: "太萌惹", val: "φ(￣∇￣o)" },
    { title: "", val: "(((┏(;￣▽￣)┛装完逼就跑" },
    { title: "", val: "( *・ω・)✄╰ひ╯" },
    { title: "", val: "─=≡Σ((( つ•̀ω•́)つ" },
    { title: "", val: "Σ( ￣□￣||)" },
    { title: "", val: "(ﾟДﾟ≡ﾟдﾟ)!?" },
    { title: "", val: "(￣y▽￣)~*捂嘴偷笑" },
  ]);
  const handleShow = () => {
    setshowEmoji(!showEmoji);
  };
  const selectEmoji = (item) => {
    props.inputMessage(item.val);
  };
  return (
    <div className="OwO">
      <div
        onClick={handleShow}
        className={["OwO-logo", showEmoji ? "OwO-logo-show" : ""].join(" ")}
      >
        <span>OωO</span>
      </div>
      <div className={["OwO-list", showEmoji ? "OwO-list-show" : ""].join(" ")}>
        {emojis.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                selectEmoji(item);
              }}
              className="OwO-item"
              title={item.title}
            >
              {item.val}
            </div>
          );
        })}
      </div>
    </div>
  );
}
