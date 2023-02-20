<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { login } from '@/service/api';
export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  setup() {
    login({
      username: 'admin',
      password: 'qwer',
    })
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.error(err);
      });
  },
});
</script>

<style lang="scss" scoped>
.home {
  font-size: 14px;
}
</style>
