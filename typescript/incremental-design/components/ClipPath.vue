<template>
  <div ref="container" :class="cp.container">
    <slot name="default"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /**
   * css background property
   */
  background?: string;
  /**
   * an array of one or SVG path command strings
   * TODO: close open paths, make sure paths are clockwise, normalize number and type of commands
   */
  paths?: [string, ...Array<string>];
  /**
   * a number between 0 and paths.length - 1, where the number indicates which path to use. If interpolate is not a whole number, then the path to use will be an interpolation between path[Math.floor(interpolate)] and path[math.Ceil(interpolate)]
   */
  interpolate?: number;
}

const props = withDefaults(defineProps<Props>(), {
  background: "none", // set prop default values
  paths: () => ["M 0 0 H 100 V 100 H 0 V 0 Z"],
  interpolate: 0
});

/**
 * when the path changes, emit an event containing the old and new path, i.e.:
 *
 * ```vue
 * <template>
 *  <clipPath @pathChange="onPathChange"></clipPath>
 * </template>
 * 
 * <script>
 * 
 *  const onPathChange = (paths: Exclude<{old: string | null, new: string | null}, {old: null, new: null}>) => {
 *    // do something with old and new paths
 *  }
 * 
 * </script>
 * ```
 */
interface Emits {
  (
    e: "pathChange",
    p: Exclude<
      { old: string | null; new: string | null },
      { old: null; new: null }
    >,
  ): void;
}

const emit = defineEmits<Emits>();

// see: https://vuejs.org/api/sfc-script-setup.html#defineslots
interface Slots {
  default(props: any): any; // the function name is the name of the slot, and the items in props are the scope exposed to the component that fills the slot: https://vuejs.org/guide/components/slots.html#scoped-slots
}

const slots = defineSlots<Slots>();
</script>

<style module="cp">
.container {
  background: v-bind(props.background);
}
</style>
