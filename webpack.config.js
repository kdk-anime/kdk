const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entryPath = './src';

module.exports = {
	mode: 'development',
	entry: {
		'App/index': path.resolve(entryPath, 'App/index.ts'),
		'service': path.resolve(entryPath, 'Service/index.ts'),
		'Plugins/Test': path.resolve(entryPath, 'Plugins/Test/index.tsx')
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'source-map-loader',
				enforce: 'pre',
			},
			{
				test: /\.scss$/,
				loader: 'sass/scss',
				enforce: 'pre',
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		plugins: [new TsconfigPathsPlugin()],
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	watchOptions: {
		ignored: [
			'node_modules',
		],
	},
};
