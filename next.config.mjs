/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// domains: [
		// 	"hanumangadi.com",
		// 	"www.hanumangadi.com"
		// ],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "hanumangadi.com",
			},
			{
				protocol: "https",
				hostname: "www.hanumangadi.com",
			},
		],
	},
	async rewrites() {
		return [
			{
				// Proxy all /api/proxy/* requests server-side → eliminates browser CORS
				source: "/api/proxy/:path*",
				destination: "https://hanumangadi.com/hanumangadi/demoapi/:path*",
			},
		];
	},
};

export default nextConfig;
