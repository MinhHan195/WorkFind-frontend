<script>
import AppFooter from "@/components/AppFooter.vue";
import { useUserStore } from "@/store/user.store";
export default {
  created() {
    this.userStore = useUserStore();
    this.userStore.fetchUserData()
  },
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
