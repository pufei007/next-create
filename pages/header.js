import Head from "next/head";

import Myheader from "../components/myheader";
import { Button } from "antd";

function Header() {
  return (
    <>
      <Myheader></Myheader>
      <div>
        <Button>我是按钮</Button>
      </div>
      <div>JSPang.com</div>
    </>
  );
}
export default Header;
