<template>
  <product-list />
</template>

<script>
import ProductList from "Components/product-list.vue";

export default {
  name: "Home",
  components: {
    'product-list': ProductList
  }
};
</script>
