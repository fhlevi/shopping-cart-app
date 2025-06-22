<template>
    <div class="product-cart">
        <div class="d-flex justify-content-between align-items-start mb-2">
            <div class="mr-2">
                <p class="product-title mb-2">{{ product.name }}</p>
                <p class="product-price mb-4">Rp.{{ formattedPrice }}</p>
            </div>
            <img
                class="card-img-top img-rounded"
                :src="product.stuff.image_url" 
                :alt="product.name" 
            />
        </div>
        <button class="btn btn-success" @click="handleAddToCart">
            add to cart
        </button>
    </div>
</template>

<script>
    export default {
        name: 'ProductItem',
        props: {
            product: {
                type: Object,
                required: true
            },
        },
        computed: {
            formattedPrice() {
                return this.product.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        },
        methods: {
            /**
             * Handle adding product to cart
             * @method handleAddToCart
             * @description Emits an event to add the product to the cart
             * @returns {void}
             * @event addtocart
             */
            handleAddToCart() {
                this.$emit('addtocart', this.product);
            }
        }
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
    width: 50px;
    height: 50px;
    border: 1px solid #ddd;
    border-radius: 8px;
}
</style>