import { IOrderHandler } from "../interfaces/OrderHandler.interface";
import {
  IProduct,
  ProductId,
  IProductOnCart,
} from "../interfaces/Product.interface";
import { products as activeProducts } from "../config/products.json";
import { DiscountHandler } from "./DiscountHandler";

export class OrderHandler implements IOrderHandler {
  private items: IProductOnCart[];
  private subTotalPrice: number;
  private totalPrice: number;

  constructor() {
    this.items = [];
    this.subTotalPrice = 0;
    this.totalPrice = 0;
  }
  add = (id: ProductId, quantity: number): void => {
    const alreadyOnCart = this.items.filter((item) => item.id === id)[0];
    if (alreadyOnCart) {
      this.items = this.items.map((item) => {
        if (item.id === id) {
          item.quantity += quantity;
        }
        return item;
      });
    } else {
      const item = activeProducts.filter((product) => product.id === id)[0];
      this.items.push({ ...item, quantity });
    }
  };

  remove = (id: ProductId, quantity: number): void => {
    const isOnCart = this.items.filter((item) => item.id === id);
    if (isOnCart) {
      this.items.map((item) => {
        if (item.id === id) {
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
    this.totalPrice = subTotal + discount;
  };

  getTotal = (): number => {
    this.setTotal();
    return this.totalPrice;
  };

  getProductsOnCart = (): IProduct[] => {
    return this.items;
  };
}
