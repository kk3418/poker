const { merge } = require("webpack-merge")
const path = require("path")
const common = require("./webpack.config")

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "main.bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    optimization: {
        minimize: true,
    }
})