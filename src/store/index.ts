import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(1);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }

  return { count, double, increment };
});

export const useUserStore = defineStore('user', {
  state: () => ({ id: 10, name: '章三', age: 18 }),

  getters: {
    agePlus: state => state.age + 1,
  },

  actions: {
    updateUser() {
      this.age++;
    },
  },
});
