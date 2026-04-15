interface RawProductId {
  _id: string;
  name: string;
  description: string;
  img_src: string;
  price: number;
  stock: number;
  available: boolean;
  onSale: boolean;
  removed: boolean;
  type: string;
  presentation: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

interface RawOrderItem {
  productId: RawProductId;
  qty: number;
}

interface RawDetailedOrder {
  _id: string;
  email: string;
  items: RawOrderItem[];
  totalAmount: number;
  paymentStatus: string;
  statusUpdatedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PreCheckoutResponse {
  message: string;
  detailedOrder: RawDetailedOrder;
}
