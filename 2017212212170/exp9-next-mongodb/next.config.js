const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
	require.extensions['.css'] = (file) => {};
}

const nextConfig = {
	target: 'server',
	webpack: (config, { dev }) => {
		config.module.rules.push({
			test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			use: 'raw-loader'
		});

		return config;
	}
};

module.exports = withPlugins([withImages, withCSS({target: 'serverless',
	webpack (config) {
		config.module.rules.push({
			test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
			use: {
				loader: 'url-loader',
				options: {
					limit: 8192,
					publicPath: '/_next/static/',
					outputPath: 'static/',
					name: '[name].[ext]'
				}
			}
		})
		return config
	}})], nextConfig);
