const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const entryPath = './src/assets/js';

module.exports = {
	mode: 'development',
	entry: {
		'index': path.resolve(entryPath, 'index.ts'),
		'../../worker': path.resolve(entryPath, '../../worker.ts'),
		'plugins/core/index': path.resolve(entryPath, 'plugins/core/index.ts'),
		'plugins/kodik/index': path.resolve(entryPath, 'plugins/kodik/index.ts'),
		'plugins/shikimori/index': path.resolve(entryPath, 'plugins/shikimori/index.ts'),
		'plugins/vanilla-lazyload/index': path.resolve(entryPath, 'plugins/vanilla-lazyload/index.ts'),
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
		path: path.resolve(__dirname, 'dist', 'assets/js'),
	},
	watchOptions: {
		ignored: [
			'node_modules',
		],
	},
};
