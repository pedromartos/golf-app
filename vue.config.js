module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/golf-app/" : "/",
  devServer: {
    https: true
  }
};
