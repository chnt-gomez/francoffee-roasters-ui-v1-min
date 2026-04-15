import axios from 'axios';
import type { ApplyCheckoutRequest, ApplyCheckoutOrder } from './apply-checkout.interface';
import type { ApplyCheckoutResponse } from './apply-checkout.response';

export const applyCheckout = async (request: ApplyCheckoutRequest): Promise<ApplyCheckoutOrder> => {
  const response = await axios.post<ApplyCheckoutResponse>('http://localhost:8080/checkout/apply', request);

  const { paymentOrderId, checkoutUrl, orderId } = response.data;

  return { paymentOrderId, checkoutUrl, orderId };
};
