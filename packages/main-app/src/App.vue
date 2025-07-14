<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

const isHomepage = computed(() => route.name === "product");
const countCart = computed(() => store?.getters?.countcartlist || 0);
</script>

<template>
  <div id="app">
    <div :class="{
      'wrapper-header bg-white flex items-center': true,
      'justify-end': isHomepage,
    }">
      <router-link v-if="isHomepage" to="/cart">
        <div class="relative">
          <em class="fas fa-shopping-cart icon-size"></em>
          <span class="badge-cart">{{ countCart }}</span>
        </div>
      </router-link>
      <router-link v-else to="/">
        <em class="fas fa-arrow-left icon-size"></em>
      </router-link>
    </div>
    <router-view />
  </div>
</template>