const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: path.resolve(__dirname, "src", "index.tsx"),
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	devtool: "source-map",
	mode: "development",
	resolve: {
		preferRelative: true,
		extensions: [".js", ".ts", ".tsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"],
			},
			{
				test: /\.html/,
				use: ["html-loader"],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{ loader: "resolve-url-loader" },
					{ loader: "sass-loader" },
				],
			},
			{
				test: /\.(png|svg|gif|pdf|ico|jpg)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public", "index.html"),
		}),
	],
	devServer: {
		static: path.resolve(__dirname, "dist"),
		port: 3333,
	},
};
