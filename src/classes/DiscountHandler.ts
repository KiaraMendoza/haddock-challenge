import { DiscountType } from "../enums";
import { Product } from "../interfaces/Product.interface";
import { discounts as activeDiscounts } from "../config/discounts.json";
import { Discount } from "../interfaces";

export class DiscountHandler {
  private product: Product;
  private productAmount: number;
  private discountApplied: Discount | undefined;
  private discountAmount: number;
  constructor(parameters: { product: Product; productAmount: number }) {
    this.product = parameters.product;
    this.productAmount = parameters.productAmount;
    this.discountApplied;
    this.discountAmount = 0;
  }

  setDiscountApplied = () => {
    if (this.product.applicableDiscountId) {
      this.discountApplied = activeDiscounts.filter(
        (discount) => discount.id === this.product.applicableDiscountId
      )[0];
    }
  };

  setDiscountAmount = () => {
    if (
      this.discountApplied &&
      this.productAmount > this.discountApplied.prerequisites.minAmount
    ) {
      switch (this.discountApplied.prerequisites.discountType) {
        case DiscountType["buy-X-get-Y-free"]:
          this.discountAmount =
            this.product.price *
            this.discountApplied.prerequisites.discountValue;
          break;
        case DiscountType["fixed-amount"]:
          this.discountAmount =
            this.discountApplied.prerequisites.discountValue;
          break;

        default:
          break;
      }
    }
  };

  getDiscountAmount = (): number => {
    this.setDiscountAmount();
    this.setDiscountAmount();
    return this.discountAmount;
  };
}
