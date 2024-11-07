<template>
  <div class="cart-item">
    <h3>{{ item.product.title }}</h3>
    <p>
      {{ item.product.regular_price.value }}
      {{ item.product.regular_price.currency }}
    </p>
    <input
      type="number"
      v-model="item.quantity"
      min="1"
      @change="updateQuantity(item.product.id, item.quantity)"
    />
    <button @click="removeItem(item.product.id)">Удалить</button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useCartStore } from '~/stores/cartStore';
import { CartItem } from '~/types';

const props = defineProps<{ item: CartItem }>();
const cartStore = useCartStore();

function updateQuantity(id: number, quantity: number) {
  cartStore.updateQuantity(id, quantity);
}

function removeItem(id: number) {
  cartStore.removeFromCart(id);
}
</script>

<style scoped>
.cart-item {
  /* Add scss for cart item */
}
</style>
