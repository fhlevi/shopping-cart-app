import { createStore } from 'vuex'

const store = createStore({
    state: {
        myproductcartlist: []
    },
    mutations: {
        add_to_cart(state, product) {
            const products = state.myproductcartlist;
            const productExists = products.some(cart => cart.id === product.id);

            if (!productExists) {
                const quantity = 1
                const totalPriceNew = product.price;

                products.push({
                    ...product,
                    quantity,
                    totalPriceNew
                });
            } else {
                const findCart = state.myproductcartlist.findIndex(cart => {
                    return cart.id == product.id
                })

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
        getters: {
            cartlist: (state) => {
                return state.myproductcartlist.filter(item => {
                    return item.category.name.includes(item.category.name)
                })
            },
            countcartlist: (state) => {
                return state.myproductcartlist.length
            }
        },
        actions: {
            addtocartlist({ commit }, item) {
                commit('add_to_cart', item)
            },
            addqtycartlist({ commit }, item) {
                commit('add_qty_cart', item)
            },
            decqtycartlist({ commit }, item) {
                commit('dec_qty_cart', item)
            },
            trashfromcartlist({ commit }, item) {
                commit('trash_from_cart', item)
            }
        }
    })

export default store
