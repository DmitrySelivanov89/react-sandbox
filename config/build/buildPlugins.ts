import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildPlugins({mode, paths}: BuildOptions): Configuration['plugins'] {
    const isDevMode = mode === 'development';
    const isProdMode = mode === 'production';
    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html}),

    ]

    if (isDevMode) {
        plugins.push(new webpack.ProgressPlugin())

    }
    if (isProdMode) {
        plugins.push(new MiniCssExtractPlugin(
            {
                filename: "css/[name].[contenthash:8].css",
                chunkFilename: "css/[name].[contenthash:8]css",

            }))

    }
    return plugins
}
