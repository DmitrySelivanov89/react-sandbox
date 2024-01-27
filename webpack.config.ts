import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


type Mode = 'production' | 'development'

interface EnvVariables {
    mode: Mode
    port: number
}

export default (env: EnvVariables) => {
    const isDevMode = env.mode === 'development';
    const isProdMode = env.mode === 'production';
    const config: webpack.Configuration =
        {
            mode: env.mode ?? 'development',
            entry: path.resolve(__dirname, 'src', 'index.tsx'),
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.css$/i,
                        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
                    },
                ],
            },
            resolve: {
                extensions: ['.tsx', '.ts', '.js'],
            },
            output: {
                path: path.resolve(__dirname, 'build'),
                filename: '[name].[contenthash].js',
                clean: true
            },
            plugins: [
                new HtmlWebpackPlugin({template: path.resolve(__dirname, 'public', 'index.html')}),
                isDevMode && new webpack.ProgressPlugin(),
                isProdMode && new MiniCssExtractPlugin(
                    {
                        filename: "css/[name].[contenthash:8].css",
                        chunkFilename: "css/[name].[contenthash:8]css",

                    })
            ].filter(Boolean),
            devtool: isDevMode && 'inline-source-map',
            devServer: isDevMode ? {
                port: env.port ?? 3001,
                open: true
            } : undefined
        }
    return config
}