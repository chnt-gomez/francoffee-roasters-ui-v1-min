export interface ApplyCheckoutRequest {
  email: string;
  payer: string;
  orderId: string;
  address: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  deliveryNotes: string;
}

export interface ApplyCheckoutOrder {
  paymentOrderId: string;
  checkoutUrl: string;
  orderId: string;
}
