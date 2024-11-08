<!-- AppCheckbox.vue -->
<template>
  <label class="checkbox" :for="id">
    <input
      :id="id"
      class="checkbox__input"
      type="checkbox"
      :name="name"
      :value="value"
      :checked="modelValue"
      @change="onChange"
    />
    <span class="checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: '',
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['update:modelValue']);

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  emits('update:modelValue', checked);
}
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
  cursor: pointer;
  color: $secondary-text-color;
  font-weight: 500;

  &__input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);

    &:checked + .checkbox__label::before {
      background-color: $primary-color;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMi42NyA5LjMzIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNC4zMyA5LjMzYTEgMSAwIDAgMS0uNy0uMzNMLjI5IDUuNzFhMSAxIDAgMCAxIDEuNDItMS40MmwyLjYyIDIuNjNMMTEgLjI5YTEgMSAwIDAgMSAxLjQxIDAgMSAxIDAgMCAxIDAgMS40Mkw1IDlhMSAxIDAgMCAxLS42Ny4zM1oiLz48L3N2Zz4=);
    }
  }

  &__label {
    display: flex;
    align-items: center;
    gap: 12px;
    line-height: 1.4;

    &::before {
      content: '';
      display: block;
      width: 20px;
      flex: 0 0 20px;
      height: 20px;
      align-self: flex-start;
      border: 1px solid $primary-color;
      border-radius: $small-border-radius;
      transition: 0.3s;
      background-position: 55% 50%;
      background-repeat: no-repeat;
      background-size: 13px 10px;
    }
  }
}
</style>
