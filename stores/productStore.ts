export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
  const selectedOptionsByProductId = ref<
    Record<number, Record<string, ConfigurableOptionValue | null>>
  >({});
  const selectedVariantByProductId = ref<Record<number, Variant | null>>({});
  const brandStore = useBrandStore();

  const setProducts = (payload: Product[]) => {
    products.value = payload;
  };

  // Фильтрация товаров по выбранным брендам
  const filteredProducts = computed(() => {
    if (!brandStore.selectedBrands.length) return products.value;
    return products.value.filter((product) =>
      brandStore.selectedBrands.includes(product.brand),
    );
  });

  // Обновляем выбранные опции для конкретного товара по ID
  const updateSelectedOption = (
    productId: number,
    attributeCode: string,
    value: ConfigurableOptionValue,
  ) => {
    if (!selectedOptionsByProductId.value[productId]) {
      selectedOptionsByProductId.value[productId] = {};
    }
    selectedOptionsByProductId.value[productId][attributeCode] = value;
    updateSelectedVariant(productId);
  };

  // Обновление выбранного варианта для конкретного товара на основе выбранных опций
  const updateSelectedVariant = (productId: number) => {
    const product = products.value.find(
      (p) => p.id === productId && p.type === 'configurable',
    );
    if (product?.variants) {
      selectedVariantByProductId.value[productId] =
        product.variants.find((variant) =>
          variant.attributes.every(
            (attr) =>
              selectedOptionsByProductId.value[productId][attr.code]
                ?.value_index === attr.value_index,
          ),
        ) || null;
    }
  };

  // Картинка выбранного варианта для конкретного товара
  const selectedVariantImage = (productId: number) => {
    return selectedVariantByProductId.value[productId]
      ? selectedVariantByProductId.value[productId].product.image
      : null;
  };

  // Добавление товара в корзину с проверкой доступного варианта
  const addToCart = (product: Product, quantity: number) => {
    const cartStore = useCartStore();
    const selectedVariant = selectedVariantByProductId.value[product.id];

    if (selectedVariant || product.type === 'simple') {
      const productToCart = {
        ...product,
        id: selectedVariant?.product.id || product.id,
        image: selectedVariantImage(product.id) || product.image,
        selectedOptions: selectedOptionsByProductId.value[product.id] || {},
      };
      cartStore.addToCart(productToCart, { quantity });
    } else {
      console.warn('Вариант не выбран или отсутствует');
    }
  };

  return {
    products,
    filteredProducts,
    setProducts,
    selectedOptionsByProductId,
    selectedVariantByProductId,
    selectedVariantImage,
    updateSelectedOption,
    addToCart,
  };
});
