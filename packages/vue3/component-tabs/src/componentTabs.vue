<template>
  <ComponentBase
    is-hoverable
    is-pressable
    @state-change="handleStateChange"
    @pointer-input="handlePointerInput"
  >
    <template #default>
      <div :style="tabGroup">
        <div v-for="(tab, index) in tabs" :key="index">
          <slot :name="index">
            <ComponentButtonTemplate
              :options="{
                style: buttonStyle,
                content: tab,
                isToggleable: true,
              }"
            />
          </slot>
        </div>
      </div>
    </template>
  </ComponentBase>
</template>

<script setup lang="ts">
import useProps from "./useProps";

import ComponentBase from "@incremental.design/component-base";

import { ComponentButtonTemplate } from "@incremental.design/component-button";

import { Ref, ref, computed, ComputedRef, CSSProperties } from "vue";

const props = defineProps(useProps);
const emits = defineEmits({});

/* populate tabs */

const tabs = computed(() => props.options?.content);

const buttonStyle = computed(() => props.options?.tabStyle);

/* keep track of which tabs are toggled */

const toggledIndices: Ref<Array<number>> = ref([-1]); // todo: support zero or more tabs being selected

defineExpose({
  toggledIndices,
});

/* handle user inputs */
const handleStateChange = (stateChange) => {
  console.log(stateChange);
};

const handlePointerInput = (pointerInput) => {
  console.log(pointerInput); // todo: use pointer input to hit test the tab that is selected
};

/* make inline CSS */
// const tabGroup: ComputedRef<CSSProperties> = computed(() => {
//   return {}
// })
</script>
