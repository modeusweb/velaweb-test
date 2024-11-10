export interface Brand {
  id: number;
  title: string;
  sort: string;
  code: string;
}

export interface Product {
  id: number;
  sku: string;
  title: string;
  regular_price: {
    currency: string;
    value: number;
  };
  image: string;
  brand: number;
  type: 'simple' | 'configurable';
  configurable_options?: ConfigurableOption[];
  variants?: Variant[];
}

export interface ConfigurableOption {
  attribute_id: number;
  attribute_code: string;
  label: string;
  position?: number;
  values: ConfigurableOptionValue[];
}

export interface ConfigurableOptionValue {
  label: string;
  value_index: number;
  value: string | number;
}

export interface Variant {
  attributes: VariantAttribute[];
  product: {
    id: number;
    sku: string;
    image: string;
  };
}

export interface VariantAttribute {
  code: string;
  value_index: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  options?: Record<string, ConfigurableOptionValue>;
}
