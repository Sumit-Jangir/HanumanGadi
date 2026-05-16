/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"hanumangadi.com",
			"www.hanumangadi.com"
		],
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
