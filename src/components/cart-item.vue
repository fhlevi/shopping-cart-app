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
        <div class="d-flex justify-content-between align-items-start ">
            <input-quantity 
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

<script>
    import inputQuantity from './input-quantity.vue';

    export default {
        name: 'ProductItem',
        props: {
            product: {
                type: Object,
                required: true
            },
        },
        components: {
            'input-quantity': inputQuantity
        },
        computed: {
            formattedPrice() {
                return this.product.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }
        },
        methods: {
            /**
             * Handle decrement quantity of product
             * @method handleDecrement
             * @description Emits an event to decrement the quantity of the product
             * @returns {void}
             * @event decrementQuantity
             */
            handleDecrement() {
                this.$emit('decrementQuantity', this.product);
            },
            /**
             * Handle increment quantity of product
             * @method handleIncrement
             * @description Emits an event to increment the quantity of the product
             * @returns {void}
             * @event incrementQuantity
             */
            handleIncrement() {
                this.$emit('incrementQuantity', this.product);
            },
            /**
             * Handle delete product from cart
             * @method handleDeleteProduct
             * @description Emits an event to delete the product from the cart
             * @returns {void}
             * @event deleteProduct
             * @description This method is triggered when the delete button is clicked.
             * It emits an event to the parent component to handle the deletion of the product.
             * The parent component should listen for this event and handle the deletion logic accordingly.
             * @example <cart-item @deleteProduct="handleDeleteProduct" />
             */
            handleDeleteProduct() {
                this.$emit('deleteProduct', this.product);
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
.btn-delete {
    margin-left: 190px;
    font-size: 19px;
    color: #eaeaea;
    background: transparent;
    border: unset;
}
</style>