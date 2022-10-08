import { IProduct, ProductId } from "./Product.interface";

export interface IOrderHandler {
  add: (number: ProductId, quantity: number) => void;
  remove: (number: ProductId, quantity: number) => void;
  setSubTotal: () => void;
  setTotal: () => void;
  getSubTotal: () => number;
  getTotal: () => number;
  getProductsOnCart: () => IProduct[];
}
