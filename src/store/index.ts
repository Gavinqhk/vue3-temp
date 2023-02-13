import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  // state: () => ({ count: 0 }),
  // getters: {
  //   double: (state) => state.count * 2,
  // },
  // actions: {
  //   increment() {
  //     this.count++;
  //   },
  // },
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, double, increment };
});

export const useUserStore = defineStore('user', {
  state: () => ({ id: 0, name: '章三', age: 18 }),
  getters: {
    age: state => state.age,
  },
  actions: {
    updateUser() {
      this.age++;
    },
  },
});
