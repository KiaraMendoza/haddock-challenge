import { OrderHandler } from "../interfaces/OrderHandler.interface";
import { ProductId, ProductOnCart } from "../interfaces/Product.interface";
import { products as activeProducts } from "../config/products.json";
import { DiscountHandler } from "./DiscountHandler";

export class MyOrderHandler implements OrderHandler {
  private items: ProductOnCart[];
  private subTotalPrice: number;
  private totalPrice: number;
  constructor() {
    this.items = [];
    this.subTotalPrice = 0;
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

  setSubTotal = () => {
    const subTotal = this.items.reduce(
      (total, currentItem) => total + currentItem.price * currentItem.quantity,
      0
    );
    this.subTotalPrice = subTotal;
  };

  getSubTotal = (): number => {
    this.setSubTotal();
    return this.subTotalPrice;
  };

  setTotal = () => {
    const subTotal = this.getSubTotal();
    const discount = new DiscountHandler({
      products: this.items,
      subTotalPrice: this.subTotalPrice,
    }).getDiscountAmount();
    console.log({ discount });
    this.totalPrice = subTotal + discount;
  };

  getTotal = (): number => {
    this.setTotal();
    return this.totalPrice;
  };
}
