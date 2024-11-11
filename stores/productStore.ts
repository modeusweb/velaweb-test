/**
 * Стор для работы с товарами
 */
export const useProductStore = defineStore('product', () => {
  // Список всех товаров
  const products = ref<Product[]>([]);
  // Выбранные опции для каждого товара (по id товара)
  const selectedOptionsByProductId = ref<
    Record<number, Record<string, ConfigurableOptionValue | null>>
  >({});
  // Выбранные варианты товаров (по id товара)
  const selectedVariantByProductId = ref<Record<number, Variant | null>>({});

  // Подключаем стор брендов для фильтрации товаров
  const brandStore = useBrandStore();

  /**
   * Устанавливает полный список товаров.
   * @param {Product[]} payload - Массив объектов товаров.
   */
  const setProducts = (payload: Product[]) => {
    products.value = payload;
  };

  /**
   * Отфильтрованные товары по выбранным брендам.
   * Возвращает все товары, если фильтр брендов не установлен.
   */
  const filteredProducts = computed(() => {
    if (!brandStore.selectedBrands.length) return products.value;
    return products.value.filter((product) =>
      brandStore.selectedBrands.includes(product.brand),
    );
  });

  /**
   * Обновляет выбранную опцию для конкретного товара и обновляет его вариант.
   * @param {number} productId - Идентификатор товара.
   * @param {string} attributeCode - Код атрибута (например, цвет).
   * @param {ConfigurableOptionValue} value - Выбранное значение опции.
   */
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

  /**
   * Обновляет выбранный вариант товара на основе выбранных опций.
   * @param {number} productId - Идентификатор товара.
   */
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

  /**
   * Возвращает изображение для выбранного варианта товара.
   * @param {number} productId - Идентификатор товара.
   * @returns {string | null} - URL изображения или null.
   */
  const selectedVariantImage = (productId: number) => {
    return selectedVariantByProductId.value[productId]
      ? selectedVariantByProductId.value[productId].product.image
      : null;
  };

  /**
   * Проверяет доступность комбинации опции для указанного товара.
   * Функция проверяет, существует ли хотя бы один вариант товара
   * с заданной комбинацией значений атрибутов (например, цвет и размер).
   *
   * @param {number} productId - Идентификатор товара, для которого проверяется доступность.
   * @param {string} attributeCode - Код атрибута, например, "color" или "size".
   * @param {number} valueIndex - Индекс значения атрибута (например, индекс конкретного цвета или размера).
   * @returns {boolean} - Возвращает true, если комбинация доступна, и false, если такой комбинации нет.
   */
  const isOptionAvailable = (
    productId: number,
    attributeCode: string,
    valueIndex: number,
  ): boolean => {
    const product = products.value.find(
      (p) => p.id === productId && p.type === 'configurable',
    );
    if (!product) return false;

    const selectedOptions = selectedOptionsByProductId.value[productId] || {};

    // Формируем целевой набор атрибутов, включая проверяемое значение
    const targetAttributes = {
      ...selectedOptions,
      [attributeCode]: { value_index: valueIndex },
    };

    // Проверяем, существует ли вариант, соответствующий целевым атрибутам
    return product.variants.some((variant) =>
      variant.attributes.every((attr) =>
        targetAttributes[attr.code]
          ? targetAttributes[attr.code].value_index === attr.value_index
          : true,
      ),
    );
  };

  /**
   * Добавляет товар или его выбранный вариант в корзину.
   * @param {Product} product - Товар для добавления.
   * @param {number} quantity - Количество.
   */
  const addToCart = (product: Product, quantity: number) => {
    const cartStore = useCartStore();
    const selectedVariant = selectedVariantByProductId.value[product.id];

    if (selectedVariant || product.type === 'simple') {
      const selectedOptions = {
        ...selectedOptionsByProductId.value[product.id],
      };
      const productToCart = {
        ...product,
        id: selectedVariant?.product.id || product.id,
        image: selectedVariantImage(product.id) || product.image,
        selectedOptions,
      };

      cartStore.addToCart(productToCart, { quantity, selectedOptions });
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
    isOptionAvailable,
    addToCart,
  };
});
