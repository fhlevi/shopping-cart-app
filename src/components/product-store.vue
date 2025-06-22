<template>
  <p class="label-cart" for="label-cart">
    <i class="fa fa-store"></i>
    <span>{{ storeName }}</span>
  </p>
</template>

<script>
export default {
  name: "ProductStore",
  props: {
    storeName: {
      type: String,
      default: "",
      requried: true
    }
  }
};
</script>

<style scoped>
.label-cart {
  font-size: 16px;
  font-weight: semibold;
  color: #000000;
  margin: 0px;
  padding: 10px 10px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: start;
  background-color: #ffffff;
}
</style>