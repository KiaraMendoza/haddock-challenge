import { ProductId } from "./Product.interface";

export interface OrderHandler {
  add: (number: ProductId, quantity: number) => void;
  getTotal: () => number;
}
