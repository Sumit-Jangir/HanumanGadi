import { apiGet, fetcher } from "@/utils/api";

export interface OrderItem {
  orderStatus: string;
  product_name: string;
  product_price: string;
  product_image_link: string;
  quantity: string;
  total_amount: string;
  to_pay: string;
  order_date: string;
  order_no: string;
  order_display_id: string;
  encoded_order_id: string;
  payment_mode: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export const getOrderHistory = async (): Promise<{ msg: string; status: boolean; data: OrderItem[] }> => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")?.replace(/"/g, "") || "";
  }

  const formData = new FormData();
  formData.append("user_id", token);

  return fetcher("/orderHistory", {
    method: "POST",
    data: formData,
  });
};

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

  const response = await fetcher("/createOrder", {
    method: "POST",
    data: formData,
    headers: token ? { Authorization: token } : undefined,
  });

  return response;
};

export interface OrderStatusAddress {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface OrderStatusResponse {
  msg: string;
  status: boolean;
  order_display_id: string;
  order_id: string;
  payment_type: string;
  payment_status: string;
  total_price: string;
  company: string;
  customer_name: string;
  phone_number: string;
  address: OrderStatusAddress;
  email: string;
}

export const getOrderStatus = async (
  orderId: string
): Promise<OrderStatusResponse> => {
  return apiGet<OrderStatusResponse>("/getOrderStatus", { order_id: orderId });
};
