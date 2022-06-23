const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: '/recipe-app/',
  pwa: {
    name: "Cooking Time",
    themeColor: "#FF5F5F",
    msTileColor: '#FFFFFF',
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
  }
}
}