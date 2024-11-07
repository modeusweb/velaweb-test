export default function useProducts() {
  const productsStore = useProductStore();

  async function loadProducts() {
    const data = await $fetch('/api/data');
    productsStore.setProducts(data.products);
  }

  return { loadProducts };
}
