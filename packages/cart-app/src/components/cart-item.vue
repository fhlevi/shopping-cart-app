<template>
    <div class="product-cart">
        <div class="flex justify-between items-start mb-2">
            <div class="pr-4">
                <p class="product-title mb-2">{{ product.name }}</p>
                <p class="product-price mb-4">Rp.{{ formattedPrice }}</p>
            </div>
            <!-- <img
                class="card-img-top img-rounded"
                :src="product.stuff.image_url" 
                :alt="product.name" 
            /> -->
            <div class="card-img-top img-rounded">
                <i class="fas fa-box"></i>
            </div>
        </div>
        <div class="flex justify-between items-start">
            <InputQuantity 
                :product="product"
                @decrement="handleDecrement"
                @increment="handleIncrement"
            />

            <button class="btn-delete" @click="handleDeleteProduct">
                <em class="fa fa-trash"></em>
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import InputQuantity from './input-quantity.vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits([
    'decrementQuantity', 
    'incrementQuantity', 
    'deleteProduct'
]);

const formattedPrice = computed(() => {
    return props.product.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

/**
 * Handle decrement quantity of product
 * @method handleDecrement
 * @description Emits an event to decrement the quantity of the product
 * @returns {void}
 * @event decrementQuantity
 */
const handleDecrement = () => {
    emit('decrementQuantity', props.product);
};

/**
 * Handle increment quantity of product
 * @method handleIncrement
 * @description Emits an event to increment the quantity of the product
 * @returns {void}
 * @event incrementQuantity
 */
const handleIncrement = () => {
    emit('incrementQuantity', props.product);
};

/** * Handle delete product from cart
 * @method handleDeleteProduct
 * @description Emits an event to delete the product from the cart
 * @returns {void}
 * @event deleteProduct
 * @description This method is triggered when the delete button is clicked.
 * It emits an event to the parent component to handle the deletion of the product.
 * The parent component should listen for this event and handle the deletion logic accordingly.
 * @example <cart-item @deleteProduct="handleDeleteProduct" />
 */
const handleDeleteProduct = () => {
    emit('deleteProduct', props.product);
};
</script>

<style scoped>
.product-cart {
    background-color: #fff;
    margin-top: 3px;
    padding: 10px 10px;
}
.product-title {
    font-size: 20px;
    font-weight: semibold;
    font-size: 16px;
    color: #000000;
}
.product-price {
    font-size: 16px;
    color: #000000;
}
.card-img-top {
    min-width: 50px;
    min-height: 50px;
    font-size: 25px;
    color: #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
}
.btn-delete {
    margin-left: 190px;
    font-size: 19px;
    color: #eaeaea;
    background: transparent;
    border: unset;
}
</style>