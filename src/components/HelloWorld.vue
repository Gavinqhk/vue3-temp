<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-card class="box-card">
      <span
        v-for="o in [
          'vue3',
          'webpack',
          'pinia',
          'vue-router',
          'element-plus',
          'eslint',
          'prettier',
          'stylelint',
          'commitilnt',
        ]"
        :key="o"
      >
        {{ o }}
      </span>
    </el-card>
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box-card {
  margin-bottom: 20px;

  span {
    display: inline-block;
    padding: 10px 20px;
  }
}

ul {
  padding: 0;
  list-style-type: none;
}

h3 {
  margin: 40px 0 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
