// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配标准屏的宽度
      viewportWidth: 375
    }
  }
}
