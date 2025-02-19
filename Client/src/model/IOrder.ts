export interface Order {
  id: number;
  orderDate: Date;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  addressLine: string;
  customerId: string;
  orderStatus: number;
  orderItems: OrderItem[];
  subTotal: number;
  deliveryFee: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
}
