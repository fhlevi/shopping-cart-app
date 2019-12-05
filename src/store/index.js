import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myproductcartlist: []
  },
  getters: {
    cartlist: state => {
      let produk = state.myproductcartlist
      return produk.filter(item => {
        return item.category.name.includes(item.category.name)
      })
    },
    countcartlist: state => {
      return state.myproductcartlist.length
    }
  },
  mutations: {
    add_to_cart(state, product) {
      const findCart = state.myproductcartlist.findIndex(cart => {
        return cart.id == product.id
      })

      // console.log(findCart)
      if (findCart == -1) {
        state.myproductcartlist.push(product)
        Vue.set(product, 'quantity', 1);
        Vue.set(product, 'totalPriceNew', product.price);
      } else {

        if (state.myproductcartlist[findCart].quantity < state.myproductcartlist[findCart].stuff.stock) {
          state.myproductcartlist[findCart].quantity += 1
          state.myproductcartlist[findCart].totalPriceNew = state.myproductcartlist[findCart].quantity * state.myproductcartlist[findCart].price;
        } else {
          console.log('stok dengan nomor id ' + product.id + ' sudah penuh')
        }
      }
    },
    add_qty_cart(state, product) {
      const findCart = state.myproductcartlist.findIndex(cart => {
        return cart.id == product.id
      })

      let myproductcartlist = [...state.myproductcartlist]

      if (myproductcartlist[findCart].quantity < myproductcartlist[findCart].stuff.stock) {
        myproductcartlist[findCart].quantity += 1
        myproductcartlist[findCart].totalPriceNew = myproductcartlist[findCart].quantity * myproductcartlist[findCart].price;
      }
    },
    dec_qty_cart(state, product) {
      const findCart = state.myproductcartlist.findIndex(cart => {
        return cart.id == product.id
      })

      let myproductcartlist = [...state.myproductcartlist]

      if (myproductcartlist[findCart].quantity > 1) {
        myproductcartlist[findCart].quantity -= 1
        myproductcartlist[findCart].totalPriceNew = myproductcartlist[findCart].totalPriceNew - myproductcartlist[findCart].price;
      }
    },
    trash_from_cart(state, product) {
      state.myproductcartlist.splice(product, 1)
    }
  },
  actions: {
    addtocartlist({
      commit
    }, item) {
      commit('add_to_cart', item)
    },
    addqtycartlist({
      commit
    }, item) {
      commit('add_qty_cart', item)
    },
    decqtycartlist({
      commit
    }, item) {
      commit('dec_qty_cart', item)
    },
    trashfromcartlist({
      commit
    }, item) {
      commit('trash_from_cart', item)
    }
  },
})