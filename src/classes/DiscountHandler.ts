import { Product } from "../interfaces/Product.interface";

export class DiscountHandler {
  private product: Product;
  private discountApplied: any;
  private totalPrice: number;
  constructor(parameters: { product: Product }) {
    this.product = parameters.product;
    this.discountApplied;
    this.totalPrice = 0;
  }

  getDiscountApplied = () => {};
}
