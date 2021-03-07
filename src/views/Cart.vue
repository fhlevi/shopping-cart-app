<template>
  <div class="container">
    <Header></Header>
    <!-- <div v-for="(mycartlist, index) in cartlist" v-bind:key="index"> -->
      <!-- <Title :nameTitle="mycartlist.store.name"></Title>
      <div class="produk-keranjang">
        <div class="title-produk">
          <label class="label-title">{{mycartlist.name}}</label>
        </div>
        <div
          class="price"
        >Rp.{{mycartlist.price.toFixed(2).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
        <br />
        <div class="row clearfix">
          <div class="col-md-1">
            <button
              class="btn btn-light"
              @click="decqty(mycartlist)"
              :disabled="mycartlist.quantity == 1 ? true : false"
            >-</button>
          </div>
          <div class="col-md-4">
            <input
              type="text"
              style="text-align: center;width: 185px;margin-left: -11.5px;"
              :value="mycartlist.quantity"
              class="form-control"
              readonly
            />
          </div>
          <div class="col-md-1">
            <button
              class="btn btn-light"
              @click="incqty(mycartlist)"
              :disabled="mycartlist.quantity == mycartlist.stuff.stock ? true : false"
            >+</button>
          </div>
          <a class="trash" @click="trashfromcart(mycartlist)">
            <i class="fa fa-trash"></i>
          </a>
        </div>
        <div>
          <img v-bind:src="mycartlist.stuff.image_url" class="pull-right card-img-top img-rounded" />
        </div>
      </div>
      <br />
    </div>
    <Footer :totalPrice="this.totalPrices"></Footer> -->
    <ul>
      <template v-for="(item, index) in userListPhoto">
        <li :key="index" style="margin-bottom: 15px;">
          id: {{ item.id }}<br>
          title: {{ item.title }}<br>
          image: <img :src="item.thumbnailUrl" :alt="item.title"><br>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import userAPI from '@/api/user.js';
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import Title from "@/views/Title.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Header,
    Footer,
    Title
  },
  data() {
    return {
      userListPhoto: [],
      userModel: null,
    }
  },
  computed: {
    ...mapGetters(["cartlist"]),
    totalPrices() {
      let total = 0;

      for (let item of this.$store.state.myproductcartlist) {
        total += item.totalPriceNew;
      }

      let totalidr = (total / 1).toFixed(2).replace(".", ",");
      return totalidr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  created() {
    this.initModel()
    this.getDataPhotoUser()
  },
  methods: {
    initModel() {
        this.userModel = new userAPI({})
    },
    trashfromcart(mycartlist) {
      this.$store.dispatch("trashfromcartlist", mycartlist);
    },
    incqty(mycartlist) {
      this.$store.dispatch("addqtycartlist", mycartlist);
    },
    decqty(mycartlist) {
      this.$store.dispatch("decqtycartlist", mycartlist);
    },
    async getDataPhotoUser() {
      try {
        const result = await this.userModel.getListPhotoUser()
        this.userListPhoto = result.data
      } catch(err) {
        console.log("🚀 ~ file: Products.vue ~ line 61 ~ getDataUser ~ err", err)
      }
    },
  }
};
</script>

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
