<template>
  <div>
    <slot :props="{ boundAttributes, boundEventHandlers }"
      >Base Component Default content</slot
    >
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { DebuggerEvent } from '@vue/reactivity';
import { ComponentPublicInstance } from '@vue/runtime-core';

@Options({
  data() {
    return {};
  },

  provide() {
    return {};
  }, // see: https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity

  props: {},

  inject: [], // see: https://v3.vuejs.org/guide/component-provide-inject.html#working-with-reactivity

  computed: {
    boundAttributes: {
      get() {
        // function that returns the value of the computed property
      },
      // set(value:any){
      //   // function that returns nothing
      // }
    },
    boundEventHandlers: {
      get() {},
      // set(value:any){
      //   // function that returns nothing
      // }
    },
  },

  methods: {}, // (when using class style components, put the methods in the class body, not in here)

  watch: {},

  emits: {},

  directives: {},

  beforeCreate() {},

  created() {},

  beforeMount() {},

  mounted() {
    //  this.$nextTick(function (){})  // do something right after Vue renders this component's children
  },

  beforeUpdate() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeUnmount() {},

  unmounted() {},

  /**
   * Add the following imports to your file
   * to use the errorCaptured, renderTracked,
   * and renderTriggered hooks:
   * import { DebuggerEvent } from '@vue/reactivity'
   * import { ComponentPublicInstance } from '@vue/runtime-core'
   */

  errorCaptured(
    error: any,
    instance: ComponentPublicInstance | null,
    info: string
  ): boolean | void {},

  renderTracked(event: DebuggerEvent): void {},

  renderTriggered(event: DebuggerEvent): void {},
})
export default class BaseComponent extends Vue {
  // methods go here
}
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
