import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.yml$/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
		turbo: {
			rules: {
				'*.yml': {
					loaders: ['raw-loader'],
					as: '*.js',
				},
			},
		},
	},

};

export default nextConfig;
