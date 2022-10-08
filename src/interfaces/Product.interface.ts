export type ProductId = number;

export interface IProduct {
  id: ProductId;
  name: string;
  price: number;
  applicableDiscountId?: number;
}

export interface IProductOnCart extends IProduct {
  quantity: number;
}
