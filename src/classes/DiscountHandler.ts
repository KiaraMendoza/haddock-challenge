import { DiscountType } from "../enums";
import { IProductOnCart } from "../interfaces/Product.interface";
import { discounts as activeDiscounts } from "../config/discounts.json";
import { IDiscount, IDiscountHandler } from "../interfaces";

export class DiscountHandler implements IDiscountHandler {
  private products: IProductOnCart[];
  private discountsApplied: IDiscount[] | undefined;
  private discountAmount: number;
  private subTotalPrice: number;

  constructor(parameters: {
    products: IProductOnCart[];
    subTotalPrice: number;
  }) {
    this.products = parameters.products;
    this.discountsApplied;
    this.discountAmount = 0;
    this.subTotalPrice = parameters.subTotalPrice;
  }

  setDiscountsApplied = () => {
    const productApplicableDiscountIds = this.products
      .filter((product) => product.applicableDiscountId)
      .map((productWithDiscount) => productWithDiscount.applicableDiscountId);

    const productsApplicableDiscounts = productApplicableDiscountIds.map(
      (discountId) =>
        activeDiscounts.filter(
          (activeDiscount) => discountId === activeDiscount.id
        )[0]
    );
    const cartDiscounts = activeDiscounts.filter(
      (activeDiscount) => activeDiscount.prerequisites.targetType === "all"
    );

    this.discountsApplied = [...productsApplicableDiscounts, ...cartDiscounts];
  };

  handleCalculateDiscounts = (discountApplied: IDiscount) => {
    let discountAmount = 0;
    let affectedProducts = [];
    const {
      minimumAmount,
      minimumQuantity,
      discountValue,
      discountType,
      targetType,
      entitledProductIds,
    } = discountApplied.prerequisites;

    if (targetType === "all") {
      affectedProducts = [...this.products];
    } else {
      affectedProducts =
        this.products.filter((product) => {
          return entitledProductIds?.includes(product.id);
        }) || [];
    }

    if (!affectedProducts.length) return;

    switch (discountType) {
      case DiscountType["buy-X-get-Y-free"]:
        if (!minimumQuantity) return;
        const affectedProductsQuantity = affectedProducts.reduce(
          (totalQuantity, affectedProduct) =>
            (totalQuantity += affectedProduct.quantity),
          0
        );
        if (!(affectedProductsQuantity > minimumQuantity)) return;

        const cheapestAffectedProductPrice = affectedProducts.reduce(
          (prev, curr) => (prev.price < curr.price ? prev : curr)
        ).price;

        discountAmount +=
          discountValue *
          cheapestAffectedProductPrice *
          Math.ceil(affectedProductsQuantity / minimumQuantity);
        break;
      case DiscountType["fixed-amount"]:
        if (minimumAmount && this.subTotalPrice > minimumAmount)
          discountAmount += discountValue;
        break;
    }
    this.discountAmount += discountAmount;
  };

  setDiscountAmount = () => {
    this.setDiscountsApplied();
    if (this.discountsApplied?.length) {
      this.discountsApplied.forEach((discount) =>
        this.handleCalculateDiscounts(discount)
      );
    }
  };

  getDiscountAmount = (): number => {
    this.setDiscountAmount();

    return this.discountAmount;
  };
}
