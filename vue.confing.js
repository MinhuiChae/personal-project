const { defineConfig } = require('@vue/cli-service')
const path = require('path');

let pages = {
  index: {
    entry: 'src/main.ts',
    template: 'public/main.html',
  },
}

let output = {
  asyncChunks: false,
  filename: "[name].dist.js",
  cssFilename: "[name].dist.css",
}

let css = {
  extract: {
    filename: `[name].css`,
  }
};

if (process.env.NODE_ENV == "production" && process.argv[5] == 'library') {
  pages = {
    library: {
      entry: 'src/main_library.ts',
      template: 'public/main.html',
      filenameHashing: false,
    }
  }

  output = {
    asyncChunks: false,
    // chunkFormat: false,
    filename: "[name].dist.js",
  }

  css = {
    extract: false,
    // extract: {
    //   filename: `gwveitor.dist.css`,
    // }
  };
} 

module.exports = defineConfig({
  // chunk 확인 필요시
  // vue-cli-plugin-webpack-bundle-analyzer 설치
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     analyzerMode: "static",
  //     openAnalyzer: false,
  //     generateStatsFile: true,
  //     statsFilename: "bundle-report.json",
  //   }
  // },
  lintOnSave: false,
  productionSourceMap: false,
  publicPath: './',
  transpileDependencies: true,
  //chainWebpack: (config) => {
    // const svgRule = config.module.rule('svg')
    // svgRule.uses.clear()
    // svgRule
    // .use('vue-svg-loader')
    //   .loader('vue-svg-loader')
    //   .options({
    //     extract: true,
    //     spriteFilename: 'icons.svg'
    //   })    

    // config.plugin('copy').tap((entries) => {
    //   entries[0].patterns.push({
    //     from: path.resolve(__dirname, 'src/assets/'),
    //     to: path.resolve(__dirname, 'dist/others'),
    //     toType: 'dir',
    //     noErrorOnMissing: true,
    //     globOptions: { ignore: ['.DS_Store'] },
    //   })

    //   return entries
    // })
   
    // 이거 필요 X
      // config.plugin("copy").tap(([options]) => {      
      //   options.patterns[0].globOptions.ignore.push("src/assets");
      //   options.patterns[0].globOptions.ignore.push("public");
      //   return [options]
      // })
      // config.plugins.delete('prefetch')
      // config.plugins.delete('preload')
  //},
  pages: pages,
  css: css,
  configureWebpack: {
    // resolve.alias는 모듈을 더 쉽게 import, require 하게 만듭니다.
    // module: {
    //   rules: [{
    //     test: /\.mp4$/,
    //     exclude: path.resolve(__dirname, 'src/assets'),
    //   }],
    // },
    resolve: {
      alias: {
        // '@'는 현재 프로젝트의 client/src/까지의 최종 경로를 의미합니다.
        '@': path.join(__dirname, 'src/'),
        "@gcdl": path.resolve(__dirname, 'src/core/stage'),
      },
      extensions: [".ts", ".js", ".scss"],
    },
   
    output: output,
    optimization: {
      runtimeChunk: 'single',
      // splitChunks: false,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',  
            filename: 'vendors.dist.js',         
          },
        },
      },
    } 
  }
})
