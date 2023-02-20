<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  setup() {
    axios
      .post('/user/login', {
        username: 'admin',
        password: 'qwer',
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
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
