const path = require('path');

const vueConfig = {
    outputDir: 'build/',
    devServer: {
      port: 3000,
      disableHostCheck: true
    },
    configureWebpack: {
        devtool: 'source-map',
        resolve: {
          alias: {
            'Assets': path.resolve(__dirname, './src/assets'),
            'Components': path.resolve(__dirname, './src/components'),
            'Views': path.resolve(__dirname, './src/views'),
            'Api': path.resolve(__dirname, './src/api'),
            'Config': path.resolve(__dirname, './src/config'),
            'Utilities': path.resolve(__dirname, './src/utilities'),
            'Router': path.resolve(__dirname, './src/router'),
            'Store': path.resolve(__dirname, './src/store'),
            'Mock': path.resolve(__dirname, './src/utilities/mock'), 
          }
        }
      }
}

module.exports = vueConfig