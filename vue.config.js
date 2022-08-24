const path = require("path")

module.exports = {
  outputDir: "./build",

  configureWebpack: (config) => {
    config.resolve.alias = {
      "@": path.resolve(__dirname, "src"),
      views: "@/views"
    }
  },

  publicPath: '/',
  assetsDir: 'static',
  productionSourceMap: false,
  // devServer: {
  //   // Paths
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: {
  //       '/api': {
  //           target: 'http://localhost:58502/', //后端接口地址
  //           changeOrigin: true,  //是否允许跨越
  //           pathRewrite: {
  //               '^/api': '',        //重写,
  //           }
  //       }
  //   },
  //   //host: 'localhost',   //本地ip
  //   port: 8000,
  // }

  devServer: {
    proxy: {
    '/api': {
        target: 'http://www.skxd.com.cn//Api/',
        changeOrigin: true,
        pathRewrite: {
            '/api': ''
        }
      }
    }
  },
}
