<template>
  <div class="product-card">
    <img :src="product.image" alt="Product image" />
    <h3>{{ product.title }}</h3>
    <p>
      {{ product.regular_price.value }} {{ product.regular_price.currency }}
    </p>
    <button @click="addToCart(product)">Добавить в корзину</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ product: Product }>();
const cartStore = useCartStore();

const addToCart = (product: Product) => {
  cartStore.addToCart(product);
};
</script>
