<template>
  <div class="catalog-page">
    <h1>Каталог товаров</h1>
    <BrandFilter />
    <Catalog />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.catalog-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
