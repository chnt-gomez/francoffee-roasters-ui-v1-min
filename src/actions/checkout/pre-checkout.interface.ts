export interface PreCheckoutItem {
  productId: string;
  name: string;
  description: string;
  img_src: string;
  price: number;
  qty: number;
}

export interface PreCheckoutOrder {
  orderId: string;
  totalAmount: number;
  items: PreCheckoutItem[];
}
