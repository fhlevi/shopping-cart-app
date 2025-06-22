<template>
    <div class="d-flex">
        <button class="btn btn-light" :disabled="isDisabledDecrement" @click="handleDecrement">
            -
        </button>

        <input 
            type="text" 
            :value="product.quantity"
            class="form-control text-center" 
            readonly 
        />

        <button class="btn btn-light" :disabled="isDisabledIncrement" @click="handleIncrement">
            +
        </button>
    </div>
</template>

<script>
export default {
    name: 'InputQuantity',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    computed: {
        isDisabledDecrement() {
            return this.product.quantity == 1;
        },
        isDisabledIncrement() {
            return this.product.quantity == this.product.stuff.stock;
        }
    },
    methods: {
        /**
         * Handle decrement action
         * @method handleDecrement
         * @description Emits an event to decrement the quantity of the product
         * @returns {void}
         * @event decrement
         */
        handleDecrement() {
            this.$emit('decrement');
        },
        /**
         * Handle increment action
         * @method handleIncrement
         * @description Emits an event to increment the quantity of the product
         * @returns {void}
         * @event increment
         */
        handleIncrement() {
            this.$emit('increment');
        }
    }
}
</script>