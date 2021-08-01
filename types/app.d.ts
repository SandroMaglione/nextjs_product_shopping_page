declare module 'app-types' {
  type ProductCategory = string;
  type ProductKey = string;

  interface ProductCategorySelected {
    category: ProductCategory;
    isSelected: boolean;
  }

  interface ProductId {
    value: ProductKey;
  }

  interface Product {
    productId: ProductId;
    name: string;
    upcCode: string;
    price: number;
    description: string;
    imageUrl: string;
    stepSize: number;
    unitType: string;
    subtitle: string;
    brand: string;
    storeSource: string;
    category: ProductCategory;
    subcategory: string;
    inventoryOnHand: number;
    isEssential: boolean;
    deliverableNextDay: boolean;
    perHomeMaximum: number;
    enabled: boolean;
    inventoryHeld: number;
    weeklyConsumptionQuantity: number;
    subsubcategory: string;
    defaultTrackedItemSectionType: number;
    internalUnitQuantity: number;
    internalUnitMeasure: number;
    productUrl: string;
    itemType: string;
    perishabilityDays: number;
    isExplicitCaseQuantityRequired: boolean;
  }

  interface ProductInCart {
    product: Product;
    amount: number;
  }
}
