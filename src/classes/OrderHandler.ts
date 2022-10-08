import { OrderHandler } from "../interfaces/OrderHandler.interface";
import { ProductId, ProductOnCart } from "../interfaces/Product.interface";
import { products as activeProducts } from "../config/products.json";

export class MyOrderHandler implements OrderHandler {
  private items: ProductOnCart[];
  private totalPrice: number;
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }
  add = (number: ProductId, quantity: number): void => {
    const alreadyOnCart = this.items.filter(
      (item) => item.number === number
    )[0];
    if (alreadyOnCart) {
      this.items = this.items.map((item) => {
        if (item.number === number) {
          item.quantity += quantity;
        }
        return item;
      });
    } else {
      const item = activeProducts.filter(
        (product) => product.number === number
      )[0];
      this.items.push({ ...item, quantity });
    }
  };

  remove = (number: ProductId, quantity: number): void => {
    const isOnCart = this.items.filter((item) => item.number === number);
    if (isOnCart) {
      this.items.map((item) => {
        if (item.number === number) {
          item.quantity -= quantity;
        }
        return item;
      });
      return;
    }
  };

  getTotal = (): number => {
    const subTotal = this.items.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0
    );
    this.totalPrice = subTotal;
    return this.totalPrice;
  };
}
