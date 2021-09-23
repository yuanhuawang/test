module.exports = {
    publicPath: '/',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer:{
        open:true,
        port:7000,
        //跨域的配置
        proxy: {
            '/api': {
                target: "https://s.hzbiz.net/api",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/bpi': {
                target: "http://www.wangyh.icu",
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/bpi': '/'
                }
            },
        }
    },
    pages: {
        index: {
            entry: 'src/pages/index/main.js',
            template: 'src/pages/index/index.html',
            filename: 'index.html',
            title: '首页'
        },
        // admin: {
        //     entry: 'src/pages/admin/main.js',
        //     template: 'src/pages/admin/admin.html',
        //     filename: 'admin.html',
        //     title: '后台'
        // }
    }
}