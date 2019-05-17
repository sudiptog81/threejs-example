/* eslint-disable no-undef */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import"
                            ]
                        }
                    }
                },
                {
                    test: /\.s(a|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: (argv.mode === "development")
                            }
                        }
                    ]
                }
            ]
        },
        entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, "./dist/"),
            publicPath: "/",
            filename: "[name].js",
            chunkFilename: "[name].bundle.js"
        },
        resolve: {
            extensions: ["*", ".js"]
        },
        devServer: {
            contentBase: "./dist"
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        externals: {
            three: "THREE"
        }
    };
};