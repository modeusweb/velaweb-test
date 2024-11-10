/**
 * Стор для работы с брендами
 */
export const useBrandStore = defineStore('brand', () => {
  // Список всех брендов
  const brands = ref<Brand[]>([]);
  // Список выбранных брендов (по id)
  const selectedBrands = ref<number[]>([]);

  /**
   * Устанавливает полный список брендов.
   * @param {Brand[]} payload - Массив объектов брендов.
   */
  const setBrands = (payload: Brand[]) => {
    brands.value = payload;
  };

  /**
   * Устанавливает фильтр выбранных брендов, удаляя дубликаты.
   * @param {number[]} brands - Массив идентификаторов брендов.
   */
  const setBrandFilter = (brands: number[]) => {
    selectedBrands.value = [...new Set(brands)];
  };

  /**
   * Переключает состояние выбора бренда.
   * @param {number} brandId - Идентификатор бренда.
   * @param {boolean} checked - Флаг выбора (true для выбора, false для снятия выбора).
   */
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
