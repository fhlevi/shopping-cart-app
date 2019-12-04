<template>
  <div class="container">
    <Header></Header>
    <div v-for="(item, index) in productList" v-bind:key="index">
      <Title :nameTitle="item.store.name | titlefil"></Title>
      <div class="produk-keranjang">
        <div class="title-produk">
          <label class="label-title">{{item.name}}</label>
        </div>
        <div
          class="price"
        >Rp.{{item.price.toFixed(2).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
        <br />
        <div class="add-to-cart">
          <button class="btn btn-success" @click="addtocart(item)">add to cart</button>
        </div>
        <div>
          <img v-bind:src="item.stuff.image_url" class="pull-right card-img-top img-rounded" />
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import data from "@/data.json";
import Header from "@/components/Header.vue";
import Title from "@/components/Title.vue";
import { mapMutations } from "vuex";

export default {
  name: "Products",
  components: {
    Header,
    Title
  },
  data() {
    return {
      productList: []
    };
  },
  methods: {
    ...mapMutations(["add_to_cart"]),
    addtocart(item) {
      this.add_to_cart(item);
    }
  },
  computed: {},
  mounted() {
    this.productList = data.items;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-img-top {
  margin-top: -190px;
  margin-left: 430px;
  width: 50px;
  height: 50px;
}
.trash {
  margin-left: 190px;
  font-size: 19px;
  color: #eaeaea;
}
.product-list {
  text-align: center;
}
</style>
