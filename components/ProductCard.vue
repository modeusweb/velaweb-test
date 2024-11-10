<template>
  <div class="card g-col-12 g-col-sm-6 g-col-lg-4">
    <div class="card__image">
      <nuxt-img
        class="card__image-img"
        :src="productStore.selectedVariantImage(product.id) || product.image"
        :alt="product.title"
        format="png"
        srcset=""
      />
    </div>

    <div class="card__middle">
      <h3 class="card__title">{{ product.title }}</h3>

      <div v-if="product.configurable_options" class="card__options">
        <div
          v-for="option in product.configurable_options"
          :key="option.attribute_code"
          class="card__options-group"
        >
          <div class="card__options-items" :class="option.attribute_code">
            <OptionRadioButton
              v-for="value in option.values"
              :key="value.value_index"
              :name="`${option.attribute_code}-${product.id}`"
              :type="option.attribute_code === 'color' ? 'color' : 'size'"
              :value="value.label"
              :selected="
                productStore.selectedOptionsByProductId[product.id]?.[
                  option.attribute_code
                ]?.value_index === value.value_index
              "
              :available="true"
              @change="
                productStore.updateSelectedOption(
                  product.id,
                  option.attribute_code,
                  value,
                )
              "
            />
          </div>
        </div>
      </div>
    </div>

    <div class="card__bottom">
      <div class="card__price">
        {{ formatPrice(product.regular_price.value) }}
      </div>

      <quantity-selector
        v-model:quantity="selectedQuantity"
        :initialQuantity="1"
        :productId="product.id"
        @updateQuantity="handleUpdateQuantity"
        styling="small"
      />

      <app-button
        class="card__to-cart"
        @click="productStore.addToCart(product, selectedQuantity)"
        :disabled="
          !productStore.selectedVariantByProductId[product.id] &&
          product.type === 'configurable'
        "
        styling="circle"
        aria-label="Добавить в корзину"
      >
        <app-icon name="cart" />
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ product: Product }>();

const productStore = useProductStore();
const selectedQuantity = ref(1);

const handleUpdateQuantity = (id: number, quantity: number) => {
  selectedQuantity.value = quantity;
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  padding: 34px 12px 12px;
  border-radius: $primary-border-radius;
  box-shadow: $primary-box-shadow;
  overflow: hidden;

  &__image {
    position: relative;
    padding-bottom: 57.5%;

    &-img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: contain;
      -webkit-user-drag: none;
    }
  }

  &__middle {
    display: flex;
    min-height: 57px;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 40px;
  }

  &__title {
    margin: 0;
    line-height: 1.2;
  }

  &__options {
    display: flex;
    flex-direction: column;
    gap: 9px;

    &-items {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;

      &.color {
        gap: 11px;
      }
    }
  }

  &__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 26px;
  }

  &__price {
    font-size: 20px;
    letter-spacing: -0.01em;
    font-weight: bold;
  }

  &__to-cart {
    .icon {
      fill: $primary-color;
    }
  }
}
</style>
