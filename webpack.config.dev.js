// https://webpack.js.org/configuration/

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
    entry: {
        tutorial: './entry/tutorial.entry.js'
    },
    resolve: {
        alias: {
            components: path.join(__dirname, 'src', 'components'),
            actions: path.join(__dirname, 'src', 'actions'),
            reducers: path.join(__dirname, 'src', 'reducers'),
        },
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js'
    },   
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, 
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }, 
            {
                test: /\.less$/,
                exclude: /node_modules/,            
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000' 
            }            
        ]
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname)
    },
    watch: true
}