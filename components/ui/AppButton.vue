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
  gap: 7px;
  min-height: 35px;
  padding: 5px 16px;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
  color: #fff;
  border-radius: $secondary-border-radius;
  background-color: $primary-color;
  transition: 0.3s;
  overflow: hidden;

  &:hover {
    box-shadow: $primary-box-shadow;
  }

  &--circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
</style>
