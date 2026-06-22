import ProductByIdPage from "./ProductByIdPage";
import { fetchProductSlugsForBuild } from "@/lib/fetchProductSlugsForBuild";

export async function generateStaticParams() {
	const slugs = await fetchProductSlugsForBuild();

	return [
		{ id: [] as string[] },
		...slugs.map((slug) => ({ id: [slug] })),
	];
}

export default function ProductPage() {
	return <ProductByIdPage />;
}
