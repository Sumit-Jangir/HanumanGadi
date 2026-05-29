import { apiGet } from "@/utils/api";

const PRODUCTS_API = "/api/products";
const YAGYA_API = "/api/yagya";

type ApiBaseResponse<T> = {
  msg: string;
  status: boolean;
  data: T[];
};

export type RawProductItem = {
  id: string;
  slug: string;
  product_name: string;
  price: string;
  short_description: string;
  hindi_short_description: string;
  image_urls: string;
  category_name: string;
  stock_status_label: string;
};

export type HomeProduct = {
  id: string;
  slug: string;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  image: string;
  price: number;
  category: string;
  stockStatus: string;
};

const stripHtml = (value: string) =>
  value.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

const firstImage = (urls: string) => {
  if (!urls) return "/images/pic1.png";

  const candidates = urls
    .split(",")
    .map((u) => u.trim())
    .filter((u) => /^https?:\/\//i.test(u));

  return candidates[0] || "/images/pic1.png";
};

const toHomeProduct = (item: RawProductItem): HomeProduct => ({
  id: item.id,
  slug: item.slug,
  title: item.product_name,
  titleHi: item.product_name,
  description: stripHtml(item.short_description),
  descriptionHi: stripHtml(item.hindi_short_description || item.short_description),
  image: firstImage(item.image_urls),
  price: Number(item.price || 0),
  category: item.category_name,
  stockStatus: item.stock_status_label,
});

export const getProducts = async (): Promise<HomeProduct[]> => {
  const response = await apiGet<ApiBaseResponse<RawProductItem>>(PRODUCTS_API);
  return (response.data || []).map(toHomeProduct);
};

// export const getYagyaProducts = async (): Promise<HomeProduct[]> => {
//   const response = await apiGet<ApiBaseResponse<RawProductItem>>("/get_yagya");
//   return (response.data || []).map(toHomeProduct);
// };

export const getHomeServices = async (): Promise<HomeProduct[]> => {
  // const [products, yagya] = await Promise.all([getProducts(), getYagyaProducts()]);
  const [products] = await Promise.all([getProducts()]);
  // return [...products, ...yagya];
  return [...products];
};
