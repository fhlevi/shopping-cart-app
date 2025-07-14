<template>
    <CartWrapper title="Cart List">
        <div v-for="(stores, index) in storeProducts" :key="index">
            <CartStore :storeName="stores.store.name" />
            <CartItem 
                v-for="(product, productIndex) in stores.item" 
                :key="productIndex" 
                :product="product"
                @deleteProduct="handleDeleteProduct" 
                @incrementQuantity="handleIncreaseQuantity"
                @decrementQuantity="handleDecreaseQuantity" 
            />
        </div>

        <div v-if="isAvailable" class="bg-white flex justify-between items-center p-3">
            <div class="flex flex-col">
                <p class="h5">Total</p>
                <p class="h6">Rp.{{ totalPrice }}</p>
            </div>
        </div>

        <div v-else class="bg-white flex justify-center items-center p-3">
            <p class="text-xl">Your cart is empty</p>
        </div>
    </CartWrapper>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import CartWrapper from './cart-wrapper.vue';
import CartStore from "./cart-store.vue";
import CartItem from "./cart-item.vue";

const store = useStore();
const cartlist = computed(() => store?.getters?.cartlist || []);

const storeProducts = computed(() => {
    // Group cart items by store
    return cartlist.value.reduce((acc, curr) => {
        const key = curr.store.id;
        // If the store key does not exist, create it
        if (!acc[key]) {
            // Initialize the store with an empty item array
            acc[key] = {
                store: curr.store,
                item: []
            };
        }
        // Push the current product into the store's item array
        acc[key].item.push(curr);
        return acc;
    }, {});
});

const totalPrice = computed(() => {
    // Calculate the total price of all items in the cart
    const total = cartlist.value.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    // Format the total price to a string with thousands separator and replace dot with comma
    return total.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

const isAvailable = computed(() => {
    return cartlist.value.length > 0;
});

/**
 * @param {Object} product - The product object to be deleted from the cart.
 * @description Handles the deletion of a product from the cart list.
 * @method handleDeleteProduct
 * @returns {void}
 * @event deleteProduct
 * @example <cart-item @deleteProduct="handleDeleteProduct" />
 * @description This method is triggered when the delete button is clicked.
 * It calls the action to remove the product from the cart list.
 * The action `ax_trashfromcartlist` is expected to handle the logic of removing the product.
 */
const handleDeleteProduct = (product) => {
    store.dispatch('trashfromcartlist', product);
};

/**
 * @param {Object} product - The product object to increase the quantity of.
 * @description Increases the quantity of a product in the cart list.
 * @method handleIncreaseQuantity
 * @returns {void}
 * @event incrementQuantity
 * @example <cart-item @incrementQuantity="handleIncreaseQuantity" />
 * @description This method is triggered when the increment button is clicked.
 * It calls the action to increase the quantity of the product in the cart list.
 * The action `ax_addqtycartlist` is expected to handle the logic of increasing the quantity.
 */
const handleIncreaseQuantity = (product) => {
    store.dispatch('addqtycartlist', product);
};

/**
 * @param {Object} product - The product object to decrease the quantity of.
 * @description Decreases the quantity of a product in the cart list.
 * @method handleDecreaseQuantity
 * @returns {void}
 * @event decrementQuantity
 * @example <cart-item @decrementQuantity="handleDecreaseQuantity" />
 * @description This method is triggered when the decrement button is clicked.
 * It calls the action to decrease the quantity of the product in the cart list.
 * The action `ax_decqtycartlist` is expected to handle the logic of decreasing the quantity.
 */
const handleDecreaseQuantity = (product) => {
    store.dispatch('decqtycartlist', product);
};
</script>