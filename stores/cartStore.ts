export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const totalAmount = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.regular_price.value * item.quantity,
      0,
    ),
  );

  const addToCart = (product: Product, options = { quantity: 1 }) => {
    const existingItem = items.value.find(
      (item) => item.product.id === product.id,
    );
    if (existingItem) {
      existingItem.quantity += options.quantity;
    } else {
      items.value.push({ product, quantity: options.quantity, options });
    }
  };

  const updateQuantity = (id: number, quantity: number) => {
    const item = items.value.find((item) => item.product.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) removeFromCart(id);
    }
  };

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
