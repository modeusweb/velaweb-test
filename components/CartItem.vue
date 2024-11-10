<template>
  <div class="cart-item">
    <div class="cart-item__image">
      <nuxt-img
        class="cart-item__image-img"
        :src="item.product.image"
        :alt="item.product.title"
        format="png"
        srcset=""
      />
    </div>

    <div class="cart-item__middle">
      <div v-if="Object.keys(item.options).length" class="cart-item__options">
        <span v-if="item.options.size" class="cart-item__options-pair">
          {{ optionLabels['size'] }}: {{ item.options.size.label }}
        </span>
        <span v-if="item.options.color" class="cart-item__options-pair">
          {{ optionLabels['color'] }}: {{ item.options.color.label }}
        </span>
      </div>
      <h3 class="cart-item__title">{{ item.product.title }}</h3>
      <button class="cart-item__remove" @click="removeItem(item.product.id)">
        <app-icon name="bucket" />
        <span>Удалить</span>
      </button>
    </div>

    <div class="cart-item__right">
      <div class="cart-item__price">
        {{ formatPrice(item.product.regular_price.value) }}
      </div>
      <div class="cart-item__quantity">
        <quantity-selector
          v-model:quantity="item.quantity"
          :initialQuantity="item.quantity"
          :productId="item.product.id"
          @updateQuantity="updateQuantity"
          styling="big"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ item: CartItem }>();

const cartStore = useCartStore();

const optionLabels: Record<string, string> = {
  size: 'Размер',
  color: 'Цвет',
};

function updateQuantity(id: number, quantity: number) {
  cartStore.updateQuantity(id, quantity);
}

function removeItem(id: number) {
  cartStore.removeFromCart(id);
}
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  gap: 16px;
  padding: 19px 36px 19px 18px;
  border: 1px solid $primary-border-color;
  border-radius: $secondary-border-radius;
  background: $primary-background-color;

  @include respond-to(large) {
    padding: 15px;
  }

  @include respond-to(small) {
    flex-direction: column;
  }

  &__image {
    flex: 0 0 223px;
    max-width: 223px;
    align-self: center;
    height: 161px;
    position: relative;

    @include respond-to(medium) {
      flex: 0 0 180px;
      max-width: 180px;
      height: 100px;
    }

    @include respond-to(small) {
      width: 100%;
      max-width: none;
    }

    &-img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      -webkit-user-drag: none;
    }
  }

  &__middle {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 13px;
    padding: 24px 0 5px;

    @include respond-to(small) {
      padding: 12px 0;
    }
  }

  &__options {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    font-size: clamp(12px, 2vw, 16px);
  }

  &__option {
    display: flex;
    gap: 4px;
  }

  &__title {
    margin: 0;
    font-size: clamp(16px, 3vw, 24px);
    font-weight: bold;
    letter-spacing: $primary-letter-spacing;
  }

  &__remove {
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    gap: 12px;
    margin-top: auto;
    font-size: $secondary-font-size;
    font-weight: 500;
    color: $primary-text-color;

    .icon {
      width: 18px;
      height: 18px;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    gap: 17px;
    align-items: flex-end;
    justify-content: flex-end;

    @include respond-to(small) {
      align-items: flex-start;
    }
  }

  &__price {
    font-size: clamp(24px, 3vw, 32px);
    font-weight: bold;
    letter-spacing: $secondary-letter-spacing;
  }
}
</style>
