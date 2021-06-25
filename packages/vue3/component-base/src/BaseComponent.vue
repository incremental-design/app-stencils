<template>
  <p>hello world</p>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class BaseComponent extends Vue {}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
