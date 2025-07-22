import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "books.google.com",
				port: "",
				pathname: "/**", // Разрешаем все пути
			},
			{
				protocol: "http",
				hostname: "books.google.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	/* config options here */
};

export default nextConfig;
