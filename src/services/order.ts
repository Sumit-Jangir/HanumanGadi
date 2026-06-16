import { apiGet, fetcher } from "@/utils/api";

export interface OrderLineItem {
  product_name: string;
  product_price: string;
  product_image_link: string;
  quantity: string;
  total_amount: number | string;
  cod_advance?: number | string;
  total_cod_advance?: number | string;
  category_name?: string;
}

export interface OrderShipping {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  shipping_charge: number;
}

export interface OrderPricing {
  items_total: number;
  shipping_charge: number;
  cod_advance: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
}

export interface Order {
  order_no: string;
  order_display_id: string;
  orderStatus: string;
  order_date: string;
  payment_mode: string;
  shipping: OrderShipping;
  items: OrderLineItem[];
  pricing: OrderPricing;
}

export interface OrderHistoryResponse {
  msg: string;
  status: boolean;
  orders: Order[];
}

export const isCodPayment = (mode: string) => mode === "1";
export const isOnlinePayment = (mode: string) => mode === "2";

export const getOrderHistory = async (): Promise<OrderHistoryResponse> => {
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
  payment_mode: string; // '1' for COD, '2' for online
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
