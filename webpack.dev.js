const { merge } = require("webpack-merge")
const TerserPlugin = require("terser-webpack-plugin")
const common = require("./webpack.config")

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    optimization: {
        minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                },
            })
        ],
    }
})