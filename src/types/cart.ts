export interface CartItem {
  user_id: string;
  slug: string;
  product_name: string;
  product_price: string;
  cod_charges: string;
  sku: string;
  qty: number;
  total_price: string;
  image_path: string;
  codprice: number;
}

export interface CartApiResponse {
  msg: string;
  status: boolean;
  data: CartItem[];
}
