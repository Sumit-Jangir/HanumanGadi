import { apiPost, fetcher } from "@/utils/api";

export interface CreateOrderPayload {
  gotra: string;
  name: string;
  phone_number: string;
  email: string;
  city: string;
  country: string;
  pincode: string;
  address: string;
  payment_mode: string; // '1' for online, '2' for COD
  cod_advance: string;
  yagya?: string;
}

export const createOrderApi = async (
  payload: CreateOrderPayload,
) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Get token from localStorage
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")?.replace(/"/g, "") || "";
  }

  const response = await fetcher("/api/order", {
    method: "POST",
    data: formData,
    headers: token ? { Authorization: token } : undefined,
  });

  return response;
};
