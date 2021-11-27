<template>
  <div class="container">
    <Header></Header>
    <div v-for="(item, index) in productList" :key="index">
      <Title :nameTitle="item.store.name"></Title>
      <template v-for="(itemChild, indexChild) in item.item">
        <div class="produk-keranjang" :key="indexChild">
          <div class="title-produk">
            <label class="label-title">{{itemChild.name}}</label>
          </div>
          <div
            class="price"
          >
            Rp.{{itemChild.price.toFixed(0).replace(".", ",").toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}}
            </div>
          <br />
          <div class="add-to-cart">
            <button class="btn btn-success" @click="addtocart(itemChild)">add to cart</button>
          </div>
          <div>
            <img :src="itemChild.stuff.image_url" class="pull-right card-img-top img-rounded" alt="" />
          </div>
        </div>
      </template>
      <br />
    </div>
  </div>
</template>

<script>
import ProductApi from 'Api/product.js';
import Header from "@/components/Header.vue";
import Title from "@/components/Title.vue";
import { mapActions } from 'vuex';

export default {
  name: "Products",
  components: {
    Header,
    Title
  },
  data() {
    return {
      productList: [],
      productModel: null,
    };
  },
  created() {
    this.initModel()
    this.getDataUser()
  },
  methods: {
    ...mapActions({
      ax_addtocartlist: 'addtocartlist'
    }),
    initModel() {
        this.productModel = new ProductApi({})
    },
    async getDataUser() {
      try {
        const result = await this.productModel.getListUser()
        this.productList = this.mappingProduct(result.data.data.items)
      } catch(err) {
        console.log("🚀 ~ file: Products.vue ~ line 61 ~ getDataUser ~ err", err)
      }
    },
    mappingProduct(items) {
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
    addtocart(item) {
      this.ax_addtocartlist(item)
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
