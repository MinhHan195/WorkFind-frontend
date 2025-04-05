<script>
import AppFooter from "@/components/AppFooter.vue";
export default {
  components: {
    AppFooter,
  },
};
</script>

<template>
  <div id="app">
    <router-view /> 
    <AppFooter />
  </div>
</template>

<style>
.page {
  margin: 0;
  padding: 0;
}
</style>
