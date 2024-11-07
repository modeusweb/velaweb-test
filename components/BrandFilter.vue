<template>
  <div class="brand-filter">
    <h3>Фильтр по брендам</h3>
    <ul v-if="brandStore.brands.length">
      <li v-for="brand in brandStore.brands" :key="brand.id">
        <label>
          <input
            type="checkbox"
            :value="brand.id"
            v-model="selectedBrands"
            @change="toggleBrand(brand.id)"
          />
          {{ brand.title }}
        </label>
      </li>
    </ul>
    <p v-else>Загрузка брендов...</p>
  </div>
</template>

<script setup lang="ts">
const brandStore = useBrandStore();
const { selectedBrands, toggleBrand } = brandStore;
const { loadBrands } = useBrands();

onMounted(async () => await loadBrands());
</script>
