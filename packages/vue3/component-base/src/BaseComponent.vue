<template>
  <div @="EventHandlers">
    <!-- see https://www.vuemastery.com/courses/component-design-patterns/one-object-to-rule-them-all -->
    <!-- <div> -->
    <!--
      @slot Default Content
        @binding BoundAttributes
        @binding BoundEventHandlers
    -->
    <slot :Pointer="DataAndComputed.pointer" :State="DataAndComputed.state">
      isPressed: {{ DataAndComputed.state.isPressed }}
      <br />
      isFocused: {{ DataAndComputed.state.isFocused }}
      <br />
      coordinates {{ DataAndComputed.pointer.coordinates }}
    </slot>
  </div>
  <!-- todo: add suspense slot: https://v3.vuejs.org/guide/migration/suspense.html -->
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
 * - by default, no text should be selectable (because you can't select the text on a button) (user-select === none)
 */

// how to define the states enum as a 'BaseComponent.state' readonly??

// how to wrap the device input event handler return types in a BaseComponent.input readonly??

import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  UnwrapRef,
} from 'vue';

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

import handle from '@incremental.design/device-input-event-handlers';

import { ButtonStates } from './use';

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
      pointer: {
        isDown: false,
        downSince: false,
        coordinates: false,
      },
      state: new ButtonStates(),
    });

    // !Methods

    // !Event Handlers
    const EventHandlers = {
      mousedown: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = MousedownListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
      },

      mouseenter: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = MouseenterListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );
      },

      mouseleave: (e: Event) => {
        DataAndComputed.state.isFocused = false;

        DataAndComputed.pointer.coordinates = MouseleaveListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },

      mousemove: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = MousemoveListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );
      },

      mouseup: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = MouseupListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
      // webkitmouseforcedown: (e) => {
      //   DataAndComputed.previousEvent = e;
      // },
      touchstart: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = TouchstartListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = true;
        DataAndComputed.pointer.downSince = e.timeStamp;
      },
      touchmove: (e: Event) => {
        DataAndComputed.state.isFocused = true;

        DataAndComputed.pointer.coordinates = TouchmoveListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = true;
      },
      touchend: (e: Event) => {
        DataAndComputed.state.isFocused = false;

        DataAndComputed.pointer.coordinates = TouchendListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
      touchcancel: (e: Event) => {
        DataAndComputed.state.isFocused = false;

        DataAndComputed.pointer.coordinates = TouchcancelListener(
          e,
          true,
          true,
          DataAndComputed.pointer.coordinates
        );

        DataAndComputed.pointer.isDown = false;
        DataAndComputed.pointer.downSince = false;
      },
    };
    // !Watchers

    watchEffect(() => {
      DataAndComputed.state.isPressed = DataAndComputed.pointer.isDown;
    });

    // !Lifecycle Hooks

    return { DataAndComputed, EventHandlers };
  },
});
</script>

<style scoped>
/* todo: pointer-events none? user-select none? */
</style>
