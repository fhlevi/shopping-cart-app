<template>
  <cart-list />
</template>

<script>
import CartList from "Components/cart-list.vue";

export default {
  name: "Cart",
  components: {
    'cart-list': CartList
  }
};
</script>
