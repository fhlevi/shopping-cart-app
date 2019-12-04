<template>
  <div class="footer">
    <div class="footer-keranjang">
      <div class="cart-total">
        <div>
          <span>TOTAL</span>
          <br />
          <label class="label--foot">Rp.{{totalPrice}}</label>
          <button class="btn btn-footer">Bayar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["totalPrice"]
};
</script>

<style scoped>
.btn-footer {
  margin-top: -20px;
  background: #c30f42;
  color: #fff;
  margin-left: 400px;
}
</style>