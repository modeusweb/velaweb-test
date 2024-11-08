<template>
  <div class="cart-page">
    <h1>Корзина</h1>
    <div v-if="cartItems.length">
      <CartItem v-for="item in cartItems" :key="item.product.id" :item="item" />
      <p class="total-amount">Итого: {{ totalAmount }} руб</p>
      <nuxt-link to="/" class="back-link">Продолжить покупки</nuxt-link>
    </div>
    <div v-else>
      <p>Ваша корзина пуста.</p>
      <nuxt-link to="/" class="back-link">Перейти в каталог</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalAmount = computed(() => cartStore.totalAmount);
</script>

<style scoped lang="scss">
.total-amount {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 20px;
}
.back-link {
  display: inline-block;
  margin-top: 20px;
  color: #007bff;
  text-decoration: underline;
}
</style>
