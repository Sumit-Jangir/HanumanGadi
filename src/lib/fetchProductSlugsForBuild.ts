type ProductListResponse = {
	data?: Array<{ slug?: string }>;
};

/** Server-only: product slugs for static export (generateStaticParams). */
export async function fetchProductSlugsForBuild(): Promise<string[]> {
	const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
	if (!baseUrl) {
		console.warn(
			"[static export] NEXT_PUBLIC_API_BASE_URL is missing; no product pages will be pre-rendered.",
		);
		return [];
	}

	try {
		const response = await fetch(`${baseUrl}/get_product`, {
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const json = (await response.json()) as ProductListResponse;
		const slugs = (json.data ?? [])
			.map((item) => item.slug?.trim())
			.filter((slug): slug is string => Boolean(slug));

		return [...new Set(slugs)];
	} catch (error) {
		console.warn("[static export] Could not fetch product slugs:", error);
		return [];
	}
}
