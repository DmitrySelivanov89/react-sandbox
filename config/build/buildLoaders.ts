import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDevMode = options.mode === 'development'
    const cssLoader = {
        test: /\.css$/i,
        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"],
    }
    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    return [cssLoader, tsLoader]
}