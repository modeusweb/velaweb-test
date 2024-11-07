<template>
  <div class="cart">
    <h2>Корзина</h2>
    <div v-if="cartItems.length">
      <CartItem v-for="item in cartItems" :key="item.product.id" :item="item" />
      <p>Итого: {{ totalAmount }} руб</p>
    </div>
    <div v-else>
      <p>Ваша корзина пуста</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalAmount = computed(() => cartStore.totalAmount);
</script>
