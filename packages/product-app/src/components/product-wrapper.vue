<template>
  <div class="container">
    <div class="wrapper-header">
      <p class="wrapper-title">{{ title }}</p>
    </div>
    <div class="wrapper-product">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Product List'
  }
});
</script>

<style scoped>
.wrapper-product {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrapper-header {
  background: #c30f42;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wrapper-title {
  color: #fff;
  font-weight: bold;
}
</style>