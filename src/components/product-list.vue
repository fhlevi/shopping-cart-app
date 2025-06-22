<template>
    <product-wrapper>
        <div v-for="(item, index) in productList" :key="index">
            <product-store :storeName="item.store.name" />
            <product-item 
                v-for="(itemChild, indexChild) in item.item" 
                :key="indexChild" 
                :product="itemChild"
                @addtocart="addtocart(itemChild)"
            />
        </div>
    </product-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import ProductApi from 'Api/product.js';
import ProductWrapper from "Components/product-wrapper.vue";
import ProductStore from "Components/product-store.vue";
import ProductItem from 'Components/product-item.vue';

export default {
    name: "ProductList",
    components: {
        'product-wrapper': ProductWrapper,
        'product-store': ProductStore,
        'product-item': ProductItem
    },
    data() {
        return {
            productList: [],
            productModel: null,
        };
    },
    created() {
        this.initModel()
        this.getProducts()
    },
    methods: {
        ...mapActions({
            ax_addtocartlist: 'addtocartlist'
        }),
        /**
         * Initialize the ProductApi model
         * @method initModel
         * @description Creates a new instance of ProductApi for fetching product data
         * @returns {void}
         */
        initModel() {
            this.productModel = new ProductApi({})
        },
        /**
         * Fetch product data from the API and map it to the component's state
         * @method getProducts
         * @description Calls the API to get a list of products and maps them to the productList state
         * @returns {Promise<void>}
         */
        async getProducts() {
            try {
                const result = await this.productModel.getListUser();
                const items = result.data.data.items || [];
                // Map the product items to a structured format
                this.productList = this.mappingProduct(items);
            } catch (err) {
                console.log("🚀 ~ file: Products.vue ~ line 61 ~ getProducts ~ err", err)
            }
        },
        /**
         * Maps the product items to a structured format grouped by store
         * @method mappingProduct
         * @param {Array} items - The list of product items to be mapped
         * @description Groups products by store and category, returning an object with store IDs as keys
         * @returns {Object} - An object where each key is a store ID and the value is an object containing category, store, and item array
         */
        mappingProduct(items) {
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
        },
        /**
         * Adds a product item to the cart
         * @method addtocart
         * @param {Object} item - The product item to be added to the cart
         * @description Calls the Vuex action to add the product item to the cart list
         * @returns {void}
         */
        addtocart(item) {
            this.ax_addtocartlist(item)
        }
    }
};
</script>
