export const useBrandStore = defineStore('brand', () => {
  const brands = ref<Brand[]>([]);
  const selectedBrands = ref<number[]>([]);

  const setBrands = (payload: Brand[]) => {
    brands.value = payload;
  };

  const setBrandFilter = (brands: number[]) => {
    selectedBrands.value = [...new Set(brands)];
  };

  const toggleBrand = (brandId: number, checked: boolean) => {
    if (checked) {
      if (!selectedBrands.value.includes(brandId)) {
        selectedBrands.value = [...selectedBrands.value, brandId];
      }
    } else {
      selectedBrands.value = selectedBrands.value.filter(
        (brand) => brand !== brandId,
      );
    }
  };

  return {
    brands,
    setBrands,
    selectedBrands,
    toggleBrand,
    setBrandFilter,
  };
});
