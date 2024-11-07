<template>
  <div
    :class="['preloader', { 'fade-out': !visible }]"
    v-if="visible || !hasFadedOut"
  >
    <div class="preloader__spinner"></div>
  </div>
</template>

<script setup lang="ts">
const visible = ref<boolean>(true);
const hasFadedOut = ref<boolean>(false);

onMounted(() => {
  setTimeout(() => {
    visible.value = false;
    setTimeout(() => {
      hasFadedOut.value = true;
    }, 300);
  }, 0);
});
</script>

<style scoped lang="scss">
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $primary-background-color;
  z-index: 9999;
  opacity: 1;
  transition: opacity 0.3s;

  &__spinner {
    border: 8px solid $secondary-border-color;
    border-top: 8px solid $primary-color;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
  }

  &.fade-out {
    opacity: 0;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
