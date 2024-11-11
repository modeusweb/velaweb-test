<template>
  <header class="header">
    <div class="header__container container-fluid">
      <nuxt-link to="/" class="header__logo">
        <nuxt-img
          class="header__logo-img"
          src="/logo.webp"
          width="111"
          height="85"
          format="webp"
          alt="Logo"
          srcset=""
        />
      </nuxt-link>
      <nuxt-link to="/cart" class="header__cart">
        <div class="header__cart-icon">
          <app-icon name="cart" />
          <div class="header__cart-quantity" v-if="cartItems.length">
            {{ cartItems.length }}
          </div>
        </div>
        <div class="header__cart-info">
          <div class="header__cart-title">Корзина</div>
          <div class="header__cart-sum">{{ formatPrice(totalAmount) }}</div>
        </div>
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
    gap: 8px;
    font-size: $secondary-font-size;
    text-decoration: none;
    color: $primary-text-color;

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      flex: 0 0 60px;
      height: 60px;
      background-color: $primary-color;
      border-radius: 50%;
      position: relative;

      @include respond-to(medium) {
        width: 40px;
        flex: 0 0 40px;
        height: 40px;
      }

      .icon {
        fill: $primary-color;
      }
    }

    &-quantity {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      padding-top: 2px;
      border: 1px solid #fff;
      border-radius: 50%;
      position: absolute;
      top: 0;
      right: 1px;
      font-size: 10px;
      line-height: 1;
      font-weight: 500;
      overflow: hidden;
      background-color: $accent-color;
      color: #fff;

      @include respond-to(medium) {
        top: -3px;
        right: -3px;
      }
    }

    &-info {
      font-size: $secondary-font-size;
      font-weight: 500;
      line-height: 1.3;
      letter-spacing: normal;
    }

    &-title {
      margin-bottom: 5px;
      color: $secondary-text-color;
    }
  }
}
</style>
