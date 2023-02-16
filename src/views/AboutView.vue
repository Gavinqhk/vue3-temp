<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="info">
      <p>
        count {{ count }}, double {{ double }} <el-button @click="increment">increment</el-button>
      </p>
      <p>
        name: {{ userStore.name }}, age: {{ userStore.agePlus }}
        <el-button @click="updateUser">updateAge</el-button>
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCounterStore, useUserStore } from '@/store/index';
import { storeToRefs } from 'pinia';
const counterStore = useCounterStore();
const { count, double } = storeToRefs(counterStore);
const { increment } = counterStore;

const userStore = useUserStore();
const { updateUser } = userStore;
</script>
