export default function useBrands() {
  const brandsStore = useBrandStore();

  async function loadBrands() {
    const data = await $fetch('/api/data');
    brandsStore.setBrands(data.brands);
  }

  return { loadBrands };
}
