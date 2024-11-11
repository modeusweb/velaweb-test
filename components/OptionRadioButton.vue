<template>
  <label
    :class="[
      'option-radio',
      `option-radio--${type}`,
      {
        'option-radio--selected': selected,
        'option-radio--disabled': isDisabled,
      },
    ]"
    :title="`${value}`"
  >
    <input
      class="option-radio__input"
      type="radio"
      :name="name"
      :value="value"
      :disabled="isDisabled"
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
const props = defineProps<{
  type: 'color' | 'size';
  value: string;
  selected: boolean;
  name: string;
  productId: number;
  valueIndex: number;
}>();

const productStore = useProductStore();

// Вычисляемое свойство для определения, должна ли кнопка быть отключена
const isDisabled = computed(() => {
  return !productStore.isOptionAvailable(
    props.productId,
    props.type,
    props.valueIndex,
  );
});
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
    overflow: hidden;
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

  &--disabled {
    cursor: not-allowed;
  }

  &--disabled .option-radio__label {
    position: relative;
    border-color: #fc3b3b;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIxMyIgZmlsbD0ibm9uZSI+PHBhdGggc3Ryb2tlPSIjRkMzQjNCIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGQ9Ik0xLjIwMiAxMi4zNTggMjAuODc1IDFNMjAuNjczIDEyLjM1OCAxIDEiLz48L3N2Zz4=);
    }
  }
}
</style>
