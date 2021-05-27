// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const isProdMode = !isDevMode;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProdMode) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ];
    }

    return config;
}

const filename = ext => isDevMode ? `[name].${ext}` : `[name].bundle.[contenthash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {},
        },
        'css-loader'
    ];

    if (extra)
        loaders.push(extra);

    return loaders;
}

// Не используется
const scriptLoaders = (extra) => {
    const loaders = [];

    if (extra)
        loaders.loaders.push(extra);

    if (isDevMode)
        loaders.push('eslint-loader');  // WARN: eslint-loader is deprecated

    return loaders;
}

// Не используется
const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env',
            '@babel/preset-typescript'
        ],
        plugins: [
            '@babel/plugin-proposal-calss-properties'
        ]
    }

    if (preset)
        opts.presets.push(preset);

    return opts;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: { app: './index.ts' },
    output: {
        filename: filename('js'),
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
    optimization: optimization(),
    plugins: [
        new HtmlWebpackPlugin({
            template: '../static/index.html',
            minify: {
                collapseWhitespace: isProdMode,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'static/images'),
                to: path.resolve(__dirname, 'dist/images'),
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    devServer: {
        port: 4000,
        open: true,
        hot: isDevMode,
        host: 'localhost',
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/,
                use: cssLoaders('postcss-loader')
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: ['file-loader?name=./fonts/[name].[ext]']
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                use: ['file-loader?name=./images/[name].[ext]']
            },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: ['/node_modules/']
            // }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};
