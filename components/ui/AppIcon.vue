<template>
  <svg :class="['icon', `icon--${name}`]">
    <use :href="`/sprite.svg#${name}`"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.icon {
  max-width: 100%;
  max-height: 100%;

  &--cart {
    width: 29px;
    height: 29px;
  }
}
</style>
