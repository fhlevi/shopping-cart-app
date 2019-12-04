<template>
  <div class="title">
    <div class="title-keranjang">
      <label class="text-keranjang">
        <i class="fa fa-store iconSet"></i>
        &nbsp;&nbsp;{{nameTitle}}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ["nameTitle"]
};
</script>

<style scoped>
.iconSet {
  margin-left: 10px;
  margin-top: 17px;
}
</style>