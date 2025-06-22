<template>
  <div id="app">
    <div :class="{
      'wrapper-header bg-white d-flex align-items-center': true,
      'justify-content-end': isHomePage,
    }">
      <router-link v-if="isHomePage" to="/cart">
        <div class="position-relative">
          <em class="fas fa-shopping-cart icon-size"></em>
          <span class="badge-cart">{{countcartlist}}</span>
        </div>
      </router-link>
      <router-link v-else to="/">
        <em class="fas fa-arrow-left icon-size"></em>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["countcartlist"]),
    isHomePage() {
      return this.$route.name === "home";
    },
  },
};
</script>

<style>
.wrapper-header {
  padding: 20px 10px;
  width: 500px;
  margin: 0px auto;
}
.icon-size {
  font-size: 20px;
  color: #000000;
}
.badge-cart {
  position: absolute;
  background-color: #ff0000;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  font-size: 11px;
  border: 1px solid #ffffff;
}
.badge-cart {
  top: -10px;
  right: -10px;
}
</style>
