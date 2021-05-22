const path = require("path");
const webpack = require("webpack");

module.exports = {
   entry: "./src/index.js",
   mode: "development",
   devtool: 'source-map',
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: { presets: ["@babel/env"] }
         },
         {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
         }
      ]
   },
   resolve: { extensions: ["*", ".js", ".jsx"] },
   output: {
      path: path.resolve(__dirname, "public/dist/"),
      publicPath: "/public/dist/",
      filename: "bundle.js"
   },
   devServer: {
      contentBase: path.join(__dirname, "/public"),
      port: 8080,
      historyApiFallback: true,
      publicPath: "http://localhost:8080/public/dist/",
      hotOnly: true
   },
   plugins: [new webpack.HotModuleReplacementPlugin()]
};