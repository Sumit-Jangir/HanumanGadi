/** @type {import('next').NextConfig} */
const isProductionBuild = process.env.NODE_ENV === "production";

const nextConfig = {
	// Static export only for `npm run build` — keeps `next dev` working for any product slug
	...(isProductionBuild ? { output: "export" } : {}),
	trailingSlash: true,
	images: {
		unoptimized: true,
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
