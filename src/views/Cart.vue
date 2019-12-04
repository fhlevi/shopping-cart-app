<template>
  <div class="container">
    <Header></Header>
    <div v-for="(mycartlist, index) in cartlist" v-bind:key="index">
      <Title :nameTitle="mycartlist.store.name"></Title>
      <div class="produk-keranjang">
        <div class="title-produk">
          <label class="label-title">{{mycartlist.name}}</label>
        </div>
        <div class="price">Rp.{{mycartlist.price}}</div>
        <br />
        <div class="row clearfix">
          <div class="col-md-1">
            <div v-if="mycartlist.quantity == 1">
              <button class="btn btn-light" @click="decqty(mycartlist)" disabled>-</button>
            </div>
            <div v-else>
              <button class="btn btn-light" @click="decqty(mycartlist)">-</button>
            </div>
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
            <div v-if="mycartlist.quantity == mycartlist.stuff.stock">
              <button class="btn btn-light" @click="incqty(mycartlist)" disabled>+</button>
            </div>
            <div v-else>
              <button class="btn btn-light" @click="incqty(mycartlist)">+</button>
            </div>
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
    <Footer :totalPrice="this.totalPrices"></Footer>
  </div>
</template>

<script>
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
  computed: {
    ...mapGetters(["cartlist"]),
    totalPrices() {
      let total = 0;

      for (let item of this.$store.state.myproductcartlist) {
        total += item.totalPriceNew;
      }

      return total.toFixed(2);
    }
  },
  methods: {
    ...mapMutations(["trash_from_cart", "add_qty_cart", "dec_qty_cart"]),
    trashfromcart(mycartlist) {
      this.trash_from_cart(mycartlist);
    },
    incqty(mycartlist) {
      this.add_qty_cart(mycartlist);
    },
    decqty(mycartlist) {
      this.dec_qty_cart(mycartlist);
    }
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
