import { DiscountType } from "../enums";

export interface Discount {
  id: number;
  name: string;
  prerequisites: {
    minAmount: number;
    discountValue: number;
    discountType: DiscountType;
  };
}
