<template>
  <div class="catalog grid" v-if="productStore.filteredProducts.length">
    <ProductCard
      v-for="product in productStore.filteredProducts"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-else>Товары отсутствуют</div>
</template>

<script setup lang="ts">
const productStore = useProductStore();
const { loadProducts } = useProducts();

onMounted(async () => await loadProducts());
</script>

<style scoped lang="scss"></style>
