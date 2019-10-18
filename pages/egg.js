// import Link from 'next/link';
import { withRouter } from "next/router";
import axios from "axios";
import Router from "next/router";

const Egg = ({ router, list }) => {
  return (
    <div>
      <span>{router.query.name}</span>
      这是egg 页面
      <button
        onClick={() => {
          Router.push("/");
        }}
      >
        回首页
      </button>
      <button
        onClick={() => {
          Router.push("/user");
        }}
      >
        去user
      </button>
      <div>{list}</div>
      <style jsx>
                {`
                    div { color:blue;}
                    .jspang {color:red;}
                `}
            </style>
    </div>
  );
};

// Egg.getInitialProps = async () => {
//   const promise = new Promise(resolve => {
//     axios(
//       "https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList"
//     ).then(res => {
//       console.log(res);
//       resolve(res.data.data);
//     });
//   });
//   return await promise;
// };
export default withRouter(Egg);
