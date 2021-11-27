<template>
  <div class="container">
    <Header></Header>
    <div v-for="(mycartlist, index) in localCart" v-bind:key="index">
      <Title :nameTitle="mycartlist.store.name"></Title>
      <template v-for="(itemChild, indexChild) in mycartlist.item">
        <div class="produk-keranjang" :key="indexChild">
          <div class="title-produk">
            <label class="label-title">{{itemChild.name}}</label>
          </div>
          <div
            class="price"
          >Rp.{{itemChild.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}</div>
          <br />
          <div class="row clearfix">
            <div class="col-md-1">
              <button
                class="btn btn-light"
                @click="decqty(itemChild)"
                :disabled="itemChild.quantity == 1 ? true : false"
              >-</button>
            </div>
            <div class="col-md-4">
              <input
                type="text"
                style="text-align: center;width: 185px;margin-left: -11.5px;"
                :value="itemChild.quantity"
                class="form-control"
                readonly
              />
            </div>
            <div class="col-md-1">
              <button
                class="btn btn-light"
                @click="incqty(itemChild)"
                :disabled="itemChild.quantity == itemChild.stuff.stock ? true : false"
              >+</button>
            </div>
            <a class="trash" @click="trashfromcart(itemChild)">
              <em class="fa fa-trash"></em>
            </a>
          </div>
          <div>
            <img v-bind:src="itemChild.stuff.image_url" class="pull-right card-img-top img-rounded" alt="" />
          </div>
        </div>
      </template>
      <br />
    </div>
    <Footer :totalPrice="this.totalPrices" v-if="isProductCart"></Footer>
  </div>
</template>

<script>
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
import Title from "@/views/Title.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Header,
    Footer,
    Title
  },
  data() {
    return {
      localCart: [],
      userModel: null,
    }
  },
  watch: {
    cartlist: {
      immediate: true,
      deep: true,
      handler(val) {
        this.localCart = this.mappingCartProduct(val)
      }
    }
  },
  computed: {
    ...mapGetters(["cartlist"]),
    totalPrices() {
      let total = 0;

      for (let item of this.$store.state.myproductcartlist) {
        total += item.totalPriceNew;
      }

      let totalidr = (total / 1).toFixed(0).replace(".", ",");
      return totalidr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    isProductCart() {
      return this.$store.state.myproductcartlist.length
    }
  },
  methods: {
    ...mapActions({
      ax_trashfromcartlist: 'trashfromcartlist',
      ax_addqtycartlist: 'addqtycartlist',
      ax_decqtycartlist: 'decqtycartlist'
    }),
    mappingCartProduct(items) {
      let result = {}

      return items.reduce((acc, curr) => {
        const key = curr.store.id

        if(!result[key]) {
          result[key] = {
            category: curr.category,
            store: curr.store,
            item: []
          }

          acc.push(result[key])
        }

        const itemResult = curr

        result[key].item.push(itemResult)

        return acc
      }, [])
    },
    trashfromcart(mycartlist) {
      this.ax_trashfromcartlist(mycartlist)
    },
    incqty(mycartlist) {
      this.ax_addqtycartlist(mycartlist)
    },
    decqty(mycartlist) {
      this.ax_decqtycartlist(mycartlist)
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
