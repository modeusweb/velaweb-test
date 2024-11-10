/**
 * Стор для работы с корзиной
 */
export const useCartStore = defineStore('cart', () => {
  // Список товаров в корзине
  const items = ref<CartItem[]>([]);

  /**
   * Общая сумма всех товаров в корзине.
   * Рассчитывается как сумма (цена * количество) для каждого товара.
   */
  const totalAmount = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.regular_price.value * item.quantity,
      0,
    ),
  );

  /**
   * Добавляет товар в корзину или увеличивает его количество, если товар уже в корзине.
   * @param {Product} product - Товар для добавления.
   * @param {Object} options - Опции для добавления (количество и выбранные характеристики).
   * @param {number} options.quantity - Количество добавляемого товара.
   * @param {Object} options.selectedOptions - Выбранные опции товара.
   */
  const addToCart = (
    product: Product,
    options = { quantity: 1, selectedOptions: {} },
  ) => {
    const existingItem = items.value.find(
      (item) =>
        item.product.id === product.id &&
        JSON.stringify(item.options) ===
          JSON.stringify(options.selectedOptions),
    );

    if (existingItem) {
      existingItem.quantity += options.quantity;
    } else {
      items.value.push({
        product,
        quantity: options.quantity,
        options: options.selectedOptions,
      });
    }
  };

  /**
   * Обновляет количество товара в корзине.
   * Если количество становится меньше или равно нулю, товар удаляется из корзины.
   * @param {number} id - Идентификатор товара.
   * @param {number} quantity - Новое количество.
   */
  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find((item) => item.product.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) removeFromCart(id);
    }
  };

  /**
   * Удаляет товар из корзины.
   * @param {number} id - Идентификатор товара для удаления.
   */
  const removeFromCart = (id: number) => {
    items.value = items.value.filter((item) => item.product.id !== id);
  };

  return {
    items,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
});
