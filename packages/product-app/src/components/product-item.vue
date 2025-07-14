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
        <button class="bg-green-600 text-white py-2 px-3 rounded-lg" @click="handleAddToCart">
            add to cart
        </button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['addtocart']);

const formattedPrice = computed(() => 
    props.product.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
)

/**
 * Handle adding product to cart
 * @method handleAddToCart
 * @description Emits an event to add the product to the cart
 * @returns {void}
 * @event addtocart
 */
const handleAddToCart = () => {
    emit('addtocart', props.product);
}
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
</style>