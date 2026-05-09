/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
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
};

export default nextConfig;
