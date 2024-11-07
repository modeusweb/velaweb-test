<template>
  <header class="header">
    <div class="header__container container">
      <nuxt-link to="/" class="header__logo">
        <nuxt-img
          src="/logo.webp"
          width="111"
          height="85"
          format="webp"
          alt="Logo"
          srcset=""
        />
      </nuxt-link>
      <nuxt-link to="/cart" class="header__cart">
        <div class="header__cart-quantity">{{ cartItems.length }}</div>
        <div class="header__cart-sum">{{ totalAmount }} ₽</div>
      </nuxt-link>
    </div>
  </header>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalAmount = computed(() => cartStore.totalAmount);
</script>

<style scoped lang="scss">
.header {
  padding: 15px 0;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__cart {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
}
</style>
