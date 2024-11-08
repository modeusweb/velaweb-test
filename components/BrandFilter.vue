<template>
  <div class="filter">
    <div class="filter__head">
      <h3 class="filter__title">Фильтры</h3>
    </div>
    <div class="filter__body">
      <div class="filter__section" :class="{ closed: isClosed }">
        <div class="filter__caption" @click="toggleSection">Производитель</div>
        <ul
          class="filter__items"
          v-show="!isClosed && brandStore.brands.length"
        >
          <li
            class="filter__item"
            v-for="brand in brandStore.brands"
            :key="brand.id"
          >
            <app-checkbox
              :id="'brand-' + brand.id"
              :name="'brand-' + brand.id"
              :value="brand.id"
              :modelValue="selectedBrands.includes(brand.id)"
              @update:modelValue="(checked) => toggleBrand(brand.id, checked)"
            >
              {{ brand.title }}
            </app-checkbox>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const brandStore = useBrandStore();
const { selectedBrands, toggleBrand } = brandStore;
const { loadBrands } = useBrands();

const isClosed = ref(false);

const toggleSection = () => {
  isClosed.value = !isClosed.value;
};

onMounted(async () => await loadBrands());
</script>

<style scoped lang="scss">
.filter {
  align-self: start;
  border: 1px solid $primary-border-color;
  border-radius: $primary-border-radius;
  background: $primary-background-color;
  box-shadow: $secondary-box-shadow;

  &__head {
    padding: 20px;
    border-bottom: 1px solid $primary-border-color;
  }

  &__title {
    margin: 0;
  }

  &__body {
    padding: 20px;
  }

  &__caption {
    margin-bottom: 14px;
    position: relative;
    padding-right: 15px;
    font-size: $secondary-font-size;
    font-weight: bold;
    cursor: pointer;
    user-select: none;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 5px;
      width: 10px;
      height: 6px;
      transition: 0.3s;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48cGF0aCBmaWxsPSIjNWU1ZTVlIiBkPSJNOSA2YTEgMSAwIDAgMS0uNzEtLjI5TDUgMi40MWwtMy4yOSAzLjNBMSAxIDAgMCAxIC4yOSA0LjI5bDQtNGExIDEgMCAwIDEgMS40MiAwbDQgNGExIDEgMCAwIDEgMCAxLjQyQTEgMSAwIDAgMSA5IDZaIi8+PC9zdmc+);
    }
  }

  &__section {
    &.closed {
      .filter__caption:after {
        transform: rotate(180deg);
      }
    }
  }

  &__items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__item {
    margin: 0;
  }
}
</style>
