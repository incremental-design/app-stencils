<template>
  <B ref="BCR" :is-hoverable="true" @state-change="handleStateChange">
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
import B, { StateChange } from "@incremental.design/vue3-component-base";

/* I decided not to use props for these values, since this component isn't being reused, and I'd rather read less LOC than more */
const headlines = [
  "Close the Trust Gap",
  "Grow Your Community",
  "Shape Dialogue",
  "Tell Your Story",
];

const transitionCurrent = `all ${400}ms cubic-bezier(.16,.53,.06,1.4)`;

const transitionNotCurrent = `all ${600}ms cubic-bezier(.16,.53,.06,1.4)`;

const BCR: Ref<{ BCR: HTMLElement } | null> = ref(null);
const el: Ref<HTMLElement | null> = ref(null);

const current = ref(0);
const hovering = ref(false);
const intersecting = useIntersect(el);
const paused = ref(false);
const t = useInterval(4500, paused, 0);

const handleStateChange = (s: StateChange) => {
  hovering.value = s.newState.length == 1;
};

watchEffect(() => {
  if (intersecting.value == false) {
    paused.value = true;
    return;
  }

  paused.value = hovering.value;
});

watchEffect(() => {
  current.value = t.value % headlines.length;
});

onMounted(() => {
  if (BCR.value?.BCR) {
    /* type guard - this should ALWAYS exist */
    el.value = unref(BCR.value?.BCR);
  }
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
