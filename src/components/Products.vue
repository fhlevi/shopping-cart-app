<template>
  <div class="container">
    <Header></Header>
    <!-- <div v-for="(item, index) in productList" :key="index"> -->
      <!-- <Title :nameTitle="item.store.name"></Title>
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
      <br /> -->
    <!-- </div> -->
    <ul>
      <template v-for="(item, index) in userList">
        <li :key="index" style="margin-bottom: 15px;">
          id: {{ item.id }}<br>
          name: {{ item.name }}<br>
          username: {{ item.username }}<br>
          email: {{ item.email }}<br>
          phone: {{ item.phone }}<br>
          website: {{ item.website }}<br>
          address: {{ item.address.city }}<br>
          company: {{ item.company.name }}<br>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import userAPI from '@/api/user.js';
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
      userList: [],
      userListPhoto: [],
      productList: [],
      userModel: null,
    };
  },
  mounted() {
    this.productList = data.items;
  },
  created() {
    this.initModel()
    this.getDataUser()
  },
  methods: {
    initModel() {
        this.userModel = new userAPI({})
    },
    async getDataUser() {
      try {
        const result = await this.userModel.getListUser()
        this.userList = result.data
      } catch(err) {
        console.log("🚀 ~ file: Products.vue ~ line 61 ~ getDataUser ~ err", err)
      }
    },
    addtocart(item) {
      this.$store.dispatch("addtocartlist", item);
    }
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
