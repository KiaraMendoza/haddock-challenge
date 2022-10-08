import { IDiscount } from "./Discount.interface";

export interface IDiscountHandler {
  setDiscountsApplied: () => void;
  handleCalculateDiscounts: (discountApplied: IDiscount) => void;
  setDiscountAmount: () => void;
  getDiscountAmount: () => number;
}
