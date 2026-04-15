export interface ApplyCheckoutResponse {
  message: string;
  paymentOrderId: string;
  checkoutUrl: string;
  orderId: string;
}
