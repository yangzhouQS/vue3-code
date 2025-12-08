// rsbuild.config.ts
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginNodePolyfill } from '@rsbuild/plugin-node-polyfill';
import { pluginCssMinimizer } from '@rsbuild/plugin-css-minimizer';

import path from 'node:path';
import process from 'node:process';

const isDev = process.env.NODE_ENV === 'development';


export default {
	resolve: {
		alias: {
			'@': path.join(process.cwd(), 'src'),
		},
		extensions: [ '...', '.js', '.ts', '.json', '.jsx', '.vue', '.tsx' ],
	},
	source: {
		define: {
			// __VUE_HMR_RUNTIME__: true,
			__VUE_OPTIONS_API__: JSON.stringify(true),
			__VUE_PROD_DEVTOOLS__: JSON.stringify(true),
		},
		entry: {
		},
	},
	output: {
		assetPrefix: './', // 生产模式下有效
		distPath: {
			root: 'dist/web-content',
		},
		cleanDistPath: !isDev,
		legalComments: 'none',
		externals: {
		},
		filename: {
			js: '[name]/[name].[contenthash:8].js',
			css: '[name]/[name].js',
		},
		overrideBrowserslist: [
			'> 1%',
			'last 2 versions',
			'not ie <= 10'
		],
	},
	server: {
		base: '',
		// base: '/assembox',
	},
	html: {
		template: ({ entryName }) => {
			return './index.html';
		},
		title: ({ entryName }) => {
			return undefined;
		},
	},
	plugins: [
		pluginBabel({
			include: /\.(?:jsx|tsx)$/,
		}),
		pluginVue(),
		pluginVueJsx(),
		pluginLess(),
		pluginNodePolyfill(),
		pluginCssMinimizer(),
	],
	dev: {
		assetPrefix: './',
		// hmr: false,
		writeToDisk: true,
		client: {
			// 默认为 "location.port"
			port: 3701,
			// 默认为 "location.hostname"
			host: '0.0.0.0',
			// 默认为 "location.protocol === 'https:' ? 'wss' : 'ws'""
			protocol: undefined,
			reconnect: 200,
			overlay: true,
		},
	},
	performance: {
		// printFileSize: false
	},
	tools: {
		lightningcssLoader: false,
	},
};