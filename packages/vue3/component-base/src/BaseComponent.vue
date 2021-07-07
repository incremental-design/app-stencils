<template>
  <div>
    <slot
      >slot default content {{ boundAttributes }} {{ boundEventHandlers }}</slot
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, toRefs, watchEffect } from 'vue';

export default defineComponent({
  setup(props, { attrs, slots, emit }) {
    // notice that setup is async. Put any async code you want in here, and Vue will wait for it to resolve before loading the component. Furthermore, if you nest this component in a `<suspense>` component, Vue will display a fallback template while it waits. See: https://www.vuemastery.com/courses/vue-3-essentials/suspense
    // use `reactive()` to make objects that contain data and computed properties
    const exampleDataAndComputed: any = reactive({
      boundAttributes: 'test',
      boundEventHandlers: 'test', // notice that properties within a reactive object have to reference the object itself (in this case `exampleDataAndComputed`) in order to access sibling properties.
    });

    // return an object that contains all of the data, computed properties and methods you want to add to the component. Everything inside this object will be available to the component's template and options. Anything that isn't returned won't be available. Keep in mind that you don't need to return everything in the setup function. Any internal logic that you don't want to expose to the template can be tucked away here.
    return { ...toRefs(exampleDataAndComputed) }; // you HAVE to use `...toRefs()` to destructure reactive objects
  },
});
</script>

<style scoped></style>
