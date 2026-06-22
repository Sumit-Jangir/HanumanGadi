/** Slug from /shop/product/[[...id]] route params (static export + client nav). */
export function getProductSlugFromParams(params: {
	id?: string | string[];
}): string {
	const id = params?.id;
	if (Array.isArray(id)) return id[0] ?? "";
	return id ?? "";
}

/** Fallback when Apache serves index.html for /shop/product/<slug> direct visits. */
export function getProductSlugFromPathname(pathname?: string): string {
	if (!pathname) return "";
	const match = pathname.match(/\/shop\/product\/([^/]+)\/?$/);
	return match?.[1] ? decodeURIComponent(match[1]) : "";
}
