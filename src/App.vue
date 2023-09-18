<script lang="ts">
import { RouterView } from "vue-router";
import SideNav from "./components/SideNav.vue";
import Header from "./components/Header.vue";

export default {
  components: {
    SideNav,
    Header
  }
}
</script>

<template>
    <Header></Header>
    <div class="row">
      <div class="col">
        <SideNav></SideNav>
      </div>
      <div class="col-6">
        <div id="main">
          <RouterView />
        </div>
      </div>
      <div class="col" style="z-index:-100">
      </div>
    </div>
</template>

<style>
html {
  overflow-x: hidden;
}
</style>

