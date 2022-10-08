import { IProduct, ProductId } from "./Product.interface";

export interface IOrderHandler {
  add: (id: ProductId, quantity: number) => void;
  remove: (id: ProductId, quantity: number) => void;
  setSubTotal: () => void;
  setTotal: () => void;
  getSubTotal: () => number;
  getTotal: () => number;
  getProductsOnCart: () => IProduct[];
}
