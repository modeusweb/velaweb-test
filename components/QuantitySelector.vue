<template>
  <div class="quantity-selector" :class="`quantity-selector--${styling}`">
    <button
      class="quantity-selector__btn"
      @click="decreaseQuantity"
      :disabled="quantity <= 1"
      aria-label="Уменьшить количество"
    >
      <app-icon name="minus" />
    </button>
    <input
      class="quantity-selector__input"
      type="number"
      v-model="quantity"
      @input="onInputChange"
      name="quantity"
      aria-label="Количество"
      min="1"
    />
    <button
      class="quantity-selector__btn"
      @click="increaseQuantity"
      aria-label="Увеличить количество"
    >
      <app-icon name="plus" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  initialQuantity: number;
  productId: number;
  styling: 'small' | 'big';
}>();
const emit = defineEmits<{
  (e: 'updateQuantity', id: number, quantity: number): void;
}>();

const quantity = ref(props.initialQuantity);

const increaseQuantity = () => {
  quantity.value++;
  emit('updateQuantity', props.productId, quantity.value);
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
    emit('updateQuantity', props.productId, quantity.value);
  }
};

const onInputChange = () => {
  const num = parseInt(quantity.value as unknown as string);
  if (!isNaN(num) && num > 0) {
    quantity.value = num;
    emit('updateQuantity', props.productId, quantity.value);
  }
};

watch(quantity, (newValue) => {
  if (newValue <= 0) {
    quantity.value = 1;
  }
});
</script>

<style scoped lang="scss">
.quantity-selector {
  display: flex;
  align-items: center;
  width: 68px;
  height: 24px;
  border: 1px solid $primary-border-color;
  border-radius: $secondary-border-radius;
  background: $primary-background-color;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 100%;

    .icon {
      width: 9px;
      height: 9px;
      fill: $primary-text-color;
    }
  }

  &__input {
    width: 22px;
    height: 100%;
    border: none;
    padding-top: 2px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    color: $primary-text-color;
    outline: none;
    font-feature-settings: 'lnum' 1;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}
</style>
