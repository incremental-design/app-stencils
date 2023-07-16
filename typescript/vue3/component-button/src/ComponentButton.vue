<template>
  <componentBase
    is-hoverable
    is-pressable
    :is-toggleable="isToggleable"
    @state-change="handleStateChange"
  >
    <template #default>
      <slot
        v-bind="{
          options,
          isToggled,
          state: stateProp,
        }"
      >
        <ComponentButtonTemplate
          :options="props.options"
          :is-toggled="isToggled"
          :state="stateProp"
        />
      </slot>
    </template>
  </componentBase>
</template>

<script setup lang="ts">
import useProps from "./useProps";
import {
  Vue3ComponentBase as componentBase, // todo: fix this casing
  State,
  StateChange,
} from "@incremental.design/component-base";

import { Ref, watch, ref, computed } from "vue";

import ComponentButtonTemplate from "./ComponentButtonTemplate.vue";

const props = defineProps(useProps);
const emit = defineEmits<{
  (event: "pressing"): void;
  (event: "hovering"): void;
  (event: "toggled"): boolean;
}>();

/* if button is toggle, set toggle */
const isToggleable = computed(() => props.options?.isToggleable || false);
const isToggled = ref(false);

defineExpose({
  isToggled,
});

/* handle state change */

const currentState: Ref<Array<State>> = ref([]);

const handleStateChange = (stateChange) => {
  currentState.value = (stateChange as StateChange).newState;
};

const stateProp: Ref<State.pressing | State.hovering | "none"> = ref("none");

watch(
  () => currentState.value,
  async (current) => {
    const currentState = current;

    const s = (() => {
      if (currentState.length === 0) return "none";
      if (currentState.includes(State.pressing)) return State.pressing;
      if (currentState.includes(State.hovering)) return State.hovering;
      return "none";
    })();

    isToggled.value = currentState.includes(State.toggled);

    if (s === "pressing") emit("pressing");
    if (s === "hovering") emit("hovering");
    stateProp.value = s;
  },
  { immediate: true, deep: true },
);
</script>
