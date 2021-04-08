// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: { app: './index.ts' },
    output: {
        filename: '[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@api': path.resolve(__dirname, 'src/api'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@utils': path.resolve(__dirname, 'src/utilities'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({ template: '../static/index.html' }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        open: true,
        host: 'localhost',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, './static/styles'),
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: ['file-loader?name=./fonts/[name].[ext]']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: ['file-loader?name=./images/[name].[ext]']
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};
