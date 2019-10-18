// import Link from "next/link";

import React from "react";
import Link from "next/link";
import Router from "next/router";
const user = () => {
  function gotoXiaojiejie() {
    Router.push({
      pathname: "/egg",
      query: {
        name: "井空"
      }
    });
  }
  Router.events.on("routeChangeStart", (...args) => {
    console.log("1.routeChangeStart->路由开始变化,参数为:", ...args);
  });

  Router.events.on("routeChangeComplete", (...args) => {
    console.log("2.routeChangeComplete->路由结束变化,参数为:", ...args);
  });

  Router.events.on("beforeHistoryChange", (...args) => {
    console.log(
      "3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:",
      ...args
    );
  });

  Router.events.on("routeChangeError", (...args) => {
    console.log("4,routeChangeError->跳转发生错误,参数为:", ...args);
  });

  Router.events.on("hashChangeStart", (...args) => {
    console.log("5,hashChangeStart->hash跳转开始时执行,参数为:", ...args);
  });

  Router.events.on("hashChangeComplete", (...args) => {
    console.log("6,hashChangeComplete->hash跳转完成时,参数为:", ...args);
  });

  return (
    <>
      <div>
        <button onClick={gotoXiaojiejie}>选井空</button>
      </div>
      <div>
        <Link href="/">回首页</Link>
      </div>
    </>
  );
};
export default user;
