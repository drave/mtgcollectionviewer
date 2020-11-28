module.exports = {
  configureWebpack: {
    module: {
      rules: [{ test: /\.csv$/, use: "raw-loader" }],
    },
  },
};
