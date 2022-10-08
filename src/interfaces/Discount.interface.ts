import { DiscountType } from "../enums";
import { ProductId } from "./Product.interface";

export interface Discount {
  id: number;
  name: string;
  prerequisites: {
    minimumQuantity?: number;
    minimumAmount?: number;
    discountValue: number;
    discountType: DiscountType;
    targetType: string;
    entitledProductIds?: ProductId[];
  };
}
