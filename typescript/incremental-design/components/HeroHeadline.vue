<template>
  <B :is-hoverable="true" @state-change="handleStateChange">
    <template #default>
      <p
        v-for="(headline, index) in headlines"
        :key="index"
        :class="[
          'hook',
          $style.headline,
          index == current - 1 || (index == 3 && current == 0)
            ? $style.before
            : index == current
            ? ''
            : $style.after,
        ]"
      >
        {{ headline }}
      </p>
    </template>
  </B>
</template>

<script setup lang="ts">
import B from "@incremental.design/vue3-component-base";
import { after, before } from "node:test";

/* I decided not to use props for these values, since this component isn't being reused, and I'd rather read less LOC than more */
const headlines = [
  "Close the Trust Gap",
  "Grow Your Community",
  "Shape Dialogue",
  "Tell Your Story",
];

const transitionCurrent = `all ${400}ms cubic-bezier(.16,.53,.06,1.4)`;

const transitionNotCurrent = `all ${600}ms cubic-bezier(.16,.53,.06,1.4)`;

const current = ref(0);

const handleStateChange = () => true;

onMounted(() => {
  setInterval(() => {
    current.value = (current.value + 1) % headlines.length;
  }, 4500);
});
</script>

<style module lang="postcss">
.headline {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: v-bind(transitionCurrent);
}

.before,
.after {
  opacity: 0;
  transition: v-bind(transitionNotCurrent);
}
.before {
  transform: translateY(-100%) scale(85%);
  transform-origin: bottom;
}
.after {
  transform: translateY(100%) scale(85%);
  transform-origin: top;
  opacity: 0;
}
</style>
