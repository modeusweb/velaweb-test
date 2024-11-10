<template>
  <label
    :class="[
      'option-radio',
      `option-radio--${type}`,
      {
        'option-radio--selected': selected,
        'option-radio--disabled': !available,
      },
    ]"
  >
    <input
      class="option-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :disabled="!available"
      @change="$emit('change', value)"
    />
    <span
      class="option-radio__label"
      v-if="type === 'color'"
      :style="{ backgroundColor: value }"
    ></span>
    <span v-else class="option-radio__label">{{ value }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  type: 'color' | 'size';
  value: string;
  selected: boolean;
  name: string;
  available: boolean;
}>();
</script>

<style scoped lang="scss">
.option-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    visibility: hidden;
    clip: rect(0 0 0 0);
  }

  &__label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid $primary-border-color;
    text-align: center;
    font-size: 10px;
    font-weight: 500;
  }

  &--color .option-radio__label {
    width: 18px;
    height: 16px;
    border-radius: $small-border-radius;
    border-color: transparent;
  }

  &--size .option-radio__label {
    min-width: 22px;
    height: 15px;
    padding: 3px;
    border-radius: $secondary-border-radius;
  }

  &--selected .option-radio__label {
    border-color: $primary-border-color;
    background-color: $primary-border-color;
    color: #fff;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.8);
  }

  &--disabled .option-radio__label {
    text-decoration: line-through;
    color: #888;
    opacity: 0.5;
  }
}
</style>
