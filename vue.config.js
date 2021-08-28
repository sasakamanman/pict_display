module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.ts",
      builderOptions: {
        productName: "PictDisplay",
        appId: "com.PictDisplay",
        extraFiles: [
        ],
        win: {
          icon: 'src/assets/app.ico',
          target: [
            {
              target: 'nsis',
              arch: ['x64']
            }
          ],
          publish: {
            provider: "github",
            repo: "PictDisplay",
            owner: "sasakamanman"
          }
        },
        nsis:{
          "oneClick": false,
          "allowToChangeInstallationDirectory": true,
          "language": "0411"
      }
      },
      chainWebpackRendererProcess(config) {
        config.plugins.delete('workbox')
        config.plugins.delete('pwa')
      }
    }
  },

  configureWebpack: {
    devtool: 'source-map'
  },

  transpileDependencies: [
  ]
}
