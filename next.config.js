const withCSS = require("@zeit/next-css");
const withLess = require("@zeit/next-less");
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const themeVariables = lessToJS(
    fs.readFileSync(
      path.resolve(__dirname, './assets/antd-custom.less'),
      'utf8',
    )
  );

  const isProd = process.env.NODE_ENV === "production";
const isTest = process.env.TEST === "true";



module.exports = {
  // assetPrefix: isProd && !isTest ? "http://static.yay.com.cn/hb" : "",
  // assetPrefix: "",
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
  // 禁用 服务端 压缩
  // compression: false,
  ...withCSS(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
      },
      webpack: (config, { isServer, dev }) => {
        if (isServer) {
          // 服务端
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals)
          ];
          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader"
          });
        } else {
          // 客户端
          // config.plugins.push(
          //   new webpack.DefinePlugin({
          //     "process.env.TEST": JSON.stringify(process.env.TEST)
          //   })
          // );
          // if (!dev) {
          //   // 非开发环境去除 console.log
          //   config.optimization.minimizer.push(
          //     new TerserPlugin({
          //       exclude: /\/node_nodules/,
          //       terserOptions: {
          //         compress: {
          //           drop_console: true
          //         }
          //       }
          //     })
          //   );
          // }
        }
        // 添加别名引用
        config.resolve.alias["@"] = path.join(__dirname, "");
        // config.resolve.extensions =["jsx", "js"];
        // 添加文件hash
        config.module.rules.push({
          test: /\.(txt|jpg|png|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                context: "",
                outputPath: "static",
                publicPath: "/_next/static",
                name: "[path][name].[hash].[ext]"
              }
            }
          ]
        });
        return config;
      }
    })
  )
};
