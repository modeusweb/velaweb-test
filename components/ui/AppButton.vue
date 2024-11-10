<template>
  <component
    :is="component"
    :class="['btn', `btn--${styling}`]"
    @click="$emit('click')"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  styling: {
    type: String,
    default: 'primary',
  },
});

defineEmits(['click']);

const component = computed(() => {
  if (props.tag === 'nuxt-link') return resolveComponent('NuxtLink');
  return props.tag;
});
</script>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 65px;
  padding: 19px 30px;
  font-weight: 600;
  font-size: clamp(16px, 3vw, 24px);
  line-height: 1.1;
  text-align: center;
  letter-spacing: $secondary-letter-spacing;
  border-radius: $small-border-radius;
  background-color: $primary-color;
  color: #fff;
  transition: 0.3s;
  overflow: hidden;

  &:hover {
    box-shadow: $primary-box-shadow;
  }

  &--circle {
    width: 60px;
    flex: 0 0 60px;
    height: 60px;
    min-height: 0;
    padding: 5px;
    border-radius: 50%;

    @include respond-to(medium) {
      width: 40px;
      flex: 0 0 40px;
      height: 40px;
    }
  }
}
</style>
