export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([]);
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

  return {
    products,
    filteredProducts,
    setProducts,
  };
});
