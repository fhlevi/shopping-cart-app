<template>
    <ProductWrapper>
        <div v-for="(item, index) in productList" :key="index">
            <ProductStore :storeName="item.store.name" />
            <ProductItem 
                v-for="(itemChild, indexChild) in item.item" 
                :key="indexChild" 
                :product="itemChild"
                @addtocart="addtocart(itemChild)"
            />
        </div>
    </ProductWrapper>
</template>

<script setup>
import { useStore } from 'vuex';
import ProductWrapper from "./product-wrapper.vue";
import ProductStore from "./product-store.vue";
import ProductItem from './product-item.vue';
import { onMounted, ref } from 'vue';
import { getListProduct } from '../services/product';

const productList = ref([]);
const store = useStore(); // Assuming useStore is defined in the context

/**
 * Fetch product data from the API and map it to the component's state
 * @method getProducts
 * @description Calls the API to get a list of products and maps them to the productList state
 * @returns {Promise<void>}
 */
const getProducts = async () => {
    try {
        const result = await getListProduct();
        const items = result.data.data.items || [];
        // Map the product items to a structured format
        productList.value = mappingProduct(items);
    } catch (err) {
        console.log("🚀 ~ file: Products.vue ~ line 61 ~ getProducts ~ err", err)
    }
}

/**
 * Maps the product items to a structured format grouped by store
 * @method mappingProduct
 * @param {Array} items - The list of product items to be mapped
 * @description Groups products by store and category, returning an object with store IDs as keys
 * @returns {Object} - An object where each key is a store ID and the value is an object containing category, store, and item array
 */
const mappingProduct = (items) => {
    return items.reduce((acc, curr) => {
        const key = curr.store.id;
        // Check if the current item has a store and category
        if (!acc[key]) {
            // Initialize the store entry if it doesn't exist
            acc[key] = {
                category: curr.category,
                store: curr.store,
                item: []
            };
        }
        // Push the current product item into the store's item array
        acc[key].item.push(curr);
        return acc;
    }, {});
}

/**
 * Adds a product item to the cart
 * @method addtocart
 * @param {Object} item - The product item to be added to the cart
 * @description Calls the Vuex action to add the product item to the cart list
 * @returns {void}
 */
const addtocart = (item) => {
    store?.dispatch('addtocartlist', item)
}

onMounted(() => {
    getProducts();
})
</script>