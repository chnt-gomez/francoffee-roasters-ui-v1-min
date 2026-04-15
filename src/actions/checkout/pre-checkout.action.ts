import axios from 'axios';
import type { CartItem } from '@/types/cart.interface';
import type { PreCheckoutOrder } from './pre-checkout.interface';
import type { PreCheckoutResponse } from './pre-checkout.response';

export const preCheckout = async (cartItems: CartItem[]): Promise<PreCheckoutOrder> => {
  const response = await axios.post<PreCheckoutResponse>('http://localhost:8080/checkout/pre', {
    items: cartItems.map((item) => ({
      productId: item.product.id,
      qty: item.quantity,
    })),
  });

  const { detailedOrder } = response.data;

  return {
    orderId: detailedOrder._id,
    totalAmount: detailedOrder.totalAmount,
    items: detailedOrder.items.map(({ productId, qty }) => ({
      productId: productId._id,
      name: productId.name,
      description: productId.description,
      img_src: productId.img_src,
      price: productId.price,
      qty,
    })),
  };
};
