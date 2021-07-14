<template>
  <div>
    <!--
      @slot Default Content
        @binding BoundAttributes
        @binding BoundEventHandlers
    -->
    <slot
      >slot default content {{ boundAttributes }} {{ boundEventHandlers }}</slot
    >
  </div>
</template>

<script lang="ts">
/**
 * Base Component
 *
 * - native event handlers -> seamlss state changes + seamlss event emitters
 * - touch, tap and focus friendly
 * - animations for seamlss state changes
 * - optional 'spatial awareness' (ie the component can figure out where it is on screen, where it is relative to its containing dom node, where it is relative to its siblings)
 * - a11y and i18n friendly
 */

import { defineComponent, reactive, computed, toRefs, watch } from 'vue';

export default defineComponent({
  components: {
    // see: https://v3.vuejs.org/api/options-assets.html#components
    // List of components that have been imported into this file
  },

  props: {
    // see: https://v3.vuejs.org/api/options-data.html#props
    // prop
  },

  emits: {
    // see: https://v3.vuejs.org/api/options-data.html#emits
    // emit
  },

  setup(props, { attrs, slots, emit }) {
    // !Subroutines

    // Use any valid typescript to process the arguments of the setup function.

    // !Data and Computed Properties

    // Populate the DataAndComputed object by calling the subroutines defined above.

    const DataAndComputed: any = reactive({
      // computedPropertyName:// computed()
    });

    // !Methods

    // Use any plain function to define a method. Make sure that you use `.value` when you access any of the reactive values in `DataAndComputed`. See: https://v3.vuejs.org/guide/reactivity-fundamentals.html#ref-unwrapping
    // You must add all methods to the return object if you want them to be available to your template. If you do not have a template, you must reference all methods within your render function.

    // !Watchers

    // See: https://www.vuemastery.com/courses/vue-3-essentials/watch

    // watch()

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed) };
  },
});
</script>

<style scoped></style>
