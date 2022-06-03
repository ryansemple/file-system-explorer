const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	context: path.join(__dirname, 'src'),
	devServer: {
		static: path.resolve(__dirname, 'src'),
		port: 8080,
		open: true,
		hot: true
	},
	entry: './scripts/app.ts',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.html$/,
				loader: 'raw-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html'),
			inject: 'body'
		})
	],
	resolve: {
		extensions: ['.ts', '.js']
	}
};
