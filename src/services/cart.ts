export const removeFromCartApi = async (userId: string, productId: string, qty: string = "1") => {
  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("product_id", productId);
  formData.append("flag", "0");
  formData.append("qty", qty);

  return apiPost("/addToCart", formData, {
    "Content-Type": "multipart/form-data",
  });
};
import { apiGet, apiPost } from "@/utils/api";

export const addToCartApi = async (userId: string, productId: string, qty: string) => {
  const formData = new FormData();
  console.log("Adding to cart:", { userId, productId, qty });
  formData.append("user_id", userId);
  formData.append("product_id", productId);
  formData.append("flag", "1");
  formData.append("qty", qty);

  return apiPost("/addToCart", formData, {
    "Content-Type": "multipart/form-data",
  });
};

export const viewCartApi = async (userId: string) => {
  return apiGet(`/viewCart?user_id=${userId}`);
};
