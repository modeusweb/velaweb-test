<template>
  <div class="cart">
    <div class="cart__layout" v-if="cartItems.length">
      <div class="cart__items grid">
        <CartItem
          class="g-col-12"
          v-for="(item, index) in cartItems"
          :key="index"
          :item="item"
        />
      </div>
      <div class="cart__total">
        <div class="cart__total-amount">
          <span>Итого:</span> {{ formatPrice(totalAmount) }}
        </div>
        <app-button class="cart__total-checkout">
          Перейти к оформлению
        </app-button>
      </div>
    </div>

    <div v-else>
      <p>Ваша корзина пуста</p>
      <nuxt-link to="/" class="cart__back">Перейти в каталог</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalAmount = computed(() => cartStore.totalAmount);
</script>

<style scoped lang="scss">
.cart {
  &__items {
    gap: 15px;
  }

  &__total {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 32px;
    margin-top: 24px;
    text-align: right;

    &-amount {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem 2rem;
      font-size: clamp(24px, 3vw, 32px);
      font-weight: bold;
      letter-spacing: $secondary-letter-spacing;
    }
  }

  &__back {
    text-decoration: underline;
    font-weight: 600;
  }
}
</style>
