<template>
    <div class="flex">
        <button 
        class="bg-gray-200 disabled:bg-gray-200/40 rounded w-8 h-8 flex justify-center items-center" 
        :disabled="isDisabledDecrement" 
        @click="handleDecrement">
          -
        </button>

        <p class="text-center w-24">{{ product.quantity }}</p>

        <button 
        class="bg-gray-200 disabled:bg-gray-200/40 rounded w-8 h-8 flex justify-center items-center" 
        :disabled="isDisabledIncrement" 
        @click="handleIncrement">
          +
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

/**
 * InputQuantity component
 * @component
 * @description A component to handle the quantity input for a product in the cart.
 * It allows users to increment or decrement the quantity of a product.
 * Emits events for increment and decrement actions.
 */
const emit = defineEmits(['decrement', 'increment']);

/**
 * Props:
 * @property {Object} product - The product object containing details like quantity and stock.
 * @property {number} product.quantity - The current quantity of the product.
 * @property {Object} product.stuff - The product's stock information.
 * @property {number} product.stuff.stock - The total stock available for the product.
 */
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

/** * Computed Properties:
 * @property {boolean} isDisabledDecrement - Determines if the decrement button should be disabled.
 * @property {boolean} isDisabledIncrement - Determines if the increment button should be disabled.
 */
const isDisabledDecrement = computed(() => props.product.quantity === 1);
const isDisabledIncrement = computed(() => props.product.quantity === props.product.stuff.stock);

/** * Methods:
 * @method handleDecrement - Emits an event to decrement the product quantity.
 * @method handleIncrement - Emits an event to increment the product quantity.
 */
const handleDecrement = () => {
  emit('decrement');
}
const handleIncrement = () => {
  emit('increment');
}
</script>