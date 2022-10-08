export type ProductId = number;

export interface IProduct {
  number: ProductId;
  name: string;
  price: number;
  applicableDiscountId?: number;
}

export interface IProductOnCart extends IProduct {
  quantity: number;
}
