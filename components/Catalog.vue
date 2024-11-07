<template>
  <div class="catalog">
    <div class="product-list" v-if="productStore.filteredProducts.length">
      <ProductCard
        v-for="product in productStore.filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else>Товары отсутствуют</div>
  </div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
const { loadProducts } = useProducts();

onMounted(async () => await loadProducts());
</script>

<style scoped lang="scss">
.catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}
</style>
