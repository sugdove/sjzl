const path = require("path");
const BASE_URL = process.env.NODE_ENV === "procution" ? "/iview-admin/" : "./";
const resolve = (dir) => path.join(__dirname, dir);
// const url = "http://192.168.24.245:10008"; // http://192.168.23.77:8767 http://58.144.151.4:9528/
const url = "http://192.168.23.76:8767"; // http://192.168.23.77:8767 http://58.144.151.4:9528/
// const url='http://59.214.78.95:9528'
module.exports = {
  assetsDir: 'static',
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src")) // src默认位置设置
      .set("_c", resolve("src/components")); // components默认位置设置
  },
  devServer: {
    proxy: {
      "/curd_": {
        target: `${url}/api/metadata2`,
        // target: `http://192.168.24.248:10008`, //宋恒 
        // target: `http://192.168.24.238:10008`, //郑
        // target: `http://192.168.24.245:10008`, //罗凤
        changeOrigin: true,
        pathRewrite: {
          "^/curd_": "/",
        },
      },
      "/user": {
        target: `${url}/`,
        // target: `http://192.168.24.248:10008`, //宋恒 
        // target: `http://192.168.24.238:10008`, //郑
        // target: `http://192.168.24.245:10008`, //罗凤
        changeOrigin: true,
        pathRewrite: {
          "^/user": "/",
        },
      },
      "/menhu": {
        target: `${url}/admin-ht`,
        // target: `http://192.168.24.248:10008`, //宋恒 
        // target: `http://192.168.24.238:10008`, //郑
        // target: `http://192.168.24.245:10008`, //罗凤
        changeOrigin: true,
        pathRewrite: {
          "^/menhu": "/",
        },
      },
    },
  },
  configureWebpack: {
    //关闭 webpack 的性能提示
    performance: {
      hints:false
    }
  }
};
