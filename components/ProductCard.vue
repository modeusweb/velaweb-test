<template>
  <div class="card g-col-6 g-col-sm-6 g-col-lg-4">
    <nuxt-img
      :src="product.image"
      :alt="product.title"
      format="png"
      srcset=""
    />
    <h3>{{ product.title }}</h3>
    <p>
      {{ formatPrice(product.regular_price.value) }}
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
