export type ProductId = number;

export interface Product {
  number: ProductId;
  name: string;
  price: number;
  applicableDiscountId?: number;
}

export interface ProductOnCart extends Product {
  quantity: number;
}
