<template>
  <slot :props="">Base Component</slot>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  // see https://v3.vuejs.org/api/options-api.html
  data() {
    return {
      hi: 'hi',
    };
  },

  props: {
    name: {
      type: String,
      default: 'ajay',
      required: false,
      validator: (value: string): boolean => value === 'ajay',
    },
  },

  computed: {
    hi: {
      get() {
        return 3;
      },
      set(value) {
        return;
      },
    },
    hello: {
      get() {
        return 'hibob';
      },
      set(value: any) {
        return;
      },
    },
  },

  methods: {
    theName(a: number, b: string, c: boolean): string {
      return 'hi';
    },
  },

  watch: {
    hi: {
      handler(value, oldValue) {
        // handler logic
      },
      deep: false,
      immediate: false,
    },
  },

  emits: {
    // see: https://v3.vuejs.org/api/options-data.html#emits
    // emit
    someEvent: (payload: any) => {
      return true;
    },
  },

  render() {
    // see: https://v3.vuejs.org/api/options-dom.html#render
    return h(
      'div', // HTML Tag name, component, async component or functional component
      {}, // object with attributes, props, and events
      {} // String, Array or Object that contain nested h(...) functions
    );
    // see: https://v3.vuejs.org/guide/render-function.html#h-arguments
  },

  components: {
    // see: https://v3.vuejs.org/api/options-assets.html#components
    // List of components that have been imported into this file
  },

  directives: {
    // see: https://v3.vuejs.org/api/options-assets.html#directives
    // directive
    funDirective: {
      // see: https://v3.vuejs.org/guide/custom-directive.html#custom-directives
      created(element) {
        // do something to element during created hook
      },
      beforeMount(element) {
        // do something to element in beforeMount hook
      },
      mounted(element) {
        // do something to element in mounted hook
      },
      beforeUpdate(element) {
        // do something to element in beforeUpdate hook
      },
      updated(element) {
        // do something to element in updated hook
      },
      beforeUnmount(element) {
        // do something to element in beforeUnmount hook
      },
      unmounted(element: Element) {
        // do something to element in unmount hook
      },
    },
  },

  // see: https://v3.vuejs.org/api/options-lifecycle-hooks.html#beforecreate
  beforeCreate() {
    // do something before initializing the component's VNode
  },

  created() {
    // do something as soon as Vue initializes the component's VNode
  },

  beforeMount() {
    // do something before Vue calls the component's render function
  },

  mounted() {
    // do something right after Vue calls the component's render function
    //  this.$nextTick(function (){  // do something right after Vue renders this component's children      })
  },

  beforeUpdate() {
    // Do something before re-rendering this component.
  },

  updated() {
    // do something after re-rendering the component
  },

  activated() {
    // do something when a component that has been kept alive is activated ( see: https://v3.vuejs.org/api/options-lifecycle-hooks.html#activated )
  },

  deactivated() {
    // do something when a component that has been kept alive is deactivated
  },

  beforeUnmount() {
    // do something before destroying a Component's DOM elements
  },

  unmounted() {
    // do something after destroying a Component's DOM elements and right before destroying its VNode
  },

  errorCaptured(
    error: Error,
    instance: Component,
    info: string
  ): boolean | void {
    // do something when a component errors. Optionally return 'true' or 'false'. See: https://v3.vuejs.org/api/options-lifecycle-hooks.html#errorcaptured
  },

  renderTracked(event: DebuggerEvent): void {
    // do something when a component's re-render is observed by something else https://v3.vuejs.org/api/options-lifecycle-hooks.html#rendertracked
  },

  renderTriggered(event: DebuggerEvent): void {
    // do something when a state change triggers this component to re-render. See: https://v3.vuejs.org/api/options-lifecycle-hooks.html#rendertriggered
  },
})
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
