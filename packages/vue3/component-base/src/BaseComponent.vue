<template>
  <div @="EventHandlers" style="transform: scale(1)">
    <!-- <div> -->
    <!--
      @slot Default Content
        @binding BoundAttributes
        @binding BoundEventHandlers
    -->
    <slot>{{ pointer }}</slot>
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
 * - by default, no text should be selectable (because you can't select the text on a button)
 */

import { defineComponent, reactive, computed, toRefs, watch } from 'vue';

import {
  ClickListener,
  // DblclickListener,
  MousedownListener,
  MouseenterListener,
  MouseleaveListener,
  MousemoveListener,
  MouseoutListener,
  MouseoverListener,
  MouseupListener,
  // WebkitmouseforcedownListener,
  TouchstartListener,
  TouchmoveListener,
  TouchendListener,
  TouchcancelListener,
} from './use/Seamlss/DOMEventListeners/';

import { PointerCoordinates } from './use/Seamlss/DOMEventListeners/Utils';

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
      previousEvent: false,
      _pointer: {
        isDown: false,
        downSince: false,
        x: false,
        y: false,
        rViewport: false,
        xPercent: false,
        yPercent: false,
        dx: false,
        dy: false,
        drViewport: false,
        dxPercent: false,
        dyPercent: false,
      },
      pointer: computed({
        get: (): PointerCoordinates => {
          return DataAndComputed._pointer;
        },
        set: (Value: PointerCoordinates) => {
          // NOTE: this doesn't function like a regular setter! It won't overwrite ALL of the properties of `_pointer`! It will only overwrite `x`, `y`, `xPercent`, `yPercent`, `dx`, `dy`, `dxPercent`, and `dyPercent`. In this way, it functions more like an Object.assign.
          DataAndComputed._pointer.x = Value.x;
          DataAndComputed._pointer.y = Value.y;

          if (Value.xPercent) {
            DataAndComputed._pointer.xPercent = Value.xPercent;
          }

          if (Value.yPercent) {
            DataAndComputed._pointer.yPercent = Value.yPercent;
          }

          if (Value.dxViewport) {
            DataAndComputed._pointer.dx = Value.dxViewport;
          }

          if (Value.dxViewport) {
            DataAndComputed._pointer.dy = Value.dyViewport;
          }

          if (Value.dxPercent) {
            DataAndComputed._pointer.dxPercent = Value.dxPercent;
          }

          if (Value.dyPercent) {
            DataAndComputed._pointer.dyPercent = Value.dyPercent;
          }
        },
      }),
    });

    // !Methods

    // !Event Handlers
    const EventHandlers = {
      mousedown: (e: Event) => {
        DataAndComputed.pointer = MousedownListener(
          e,
          true,
          true,
          DataAndComputed.previousEvent
        );

        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
        DataAndComputed.previousEvent = e;
      },

      mouseenter: (e: Event) => {
        DataAndComputed.pointer = MouseenterListener(
          e,
          true,
          true,
          DataAndComputed.previousEvent
        );

        DataAndComputed.previousEvent = e;
      },

      mouseleave: (e: Event) => {
        DataAndComputed.pointer = MouseleaveListener(
          e,
          true,
          true,
          DataAndComputed.previousEvent
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;

        DataAndComputed.previousEvent = e;
      },

      mousemove: (e: Event) => {
        DataAndComputed.pointer = MousemoveListener(
          e,
          true,
          true,
          DataAndComputed.previousEvent
        );

        DataAndComputed.previousEvent = e;
      },

      mouseup: (e: Event) => {
        DataAndComputed.pointer = MouseupListener(
          e,
          true,
          true,
          DataAndComputed.previousEvent
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;

        DataAndComputed.previousEvent = e;
      },
      // webkitmouseforcedown: (e) => {
      //   DataAndComputed.previousEvent = e;
      // },
      touchstart: (e: Event) => {
        DataAndComputed.pointer = TouchstartListener(
          e,
          true,
          true,
          DataAndComputed.PreviousEvent
        );
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince;

        DataAndComputed.previousEvent = e;
      },
      touchmove: (e: Event) => {
        DataAndComputed.pointer = TouchmoveListener(
          e,
          true,
          true,
          DataAndComputed.PreviousEvent
        );
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince;

        DataAndComputed.previousEvent = e;
      },
      touchend: (e: Event) => {
        DataAndComputed.pointer = TouchendListener(
          e,
          true,
          true,
          DataAndComputed.PreviousEvent
        );
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince;

        DataAndComputed.previousEvent = e;
      },
      touchcancel: (e: Event) => {
        DataAndComputed.pointer = TouchcancelListener(
          e,
          true,
          true,
          DataAndComputed.PreviousEvent
        );
        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince;

        DataAndComputed.previousEvent = e;
      },
    };
    // !Watchers

    // See: https://www.vuemastery.com/courses/vue-3-essentials/watch

    // watch()

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed), EventHandlers };
  },
});
</script>

<style scoped></style>
