import { OrderHandler } from "../interfaces/OrderHandler.interface";
import { Product } from "../interfaces/Product.interface";

export class MyOrderHandler implements OrderHandler {
  private items: Product[];
  private appliedDiscounts: [];
  constructor() {
    this.items = [];
    this.appliedDiscounts = [];
  }
  add!: (number: number, quantity: number) => void;
  getTotal!: () => number;
}
