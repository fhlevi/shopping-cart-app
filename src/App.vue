<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>&nbsp;|
      <router-link to="/cart">
        Photo
        <!-- <span class="badge badge-pill badge-dark">{{countcartlist}}</span> -->
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["countcartlist"])
  }
};
</script>

<style>
#nav {
  text-align: center;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
