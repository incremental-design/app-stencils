<template>
  <div ref="el">
    <p ref="title">
      <span
        v-for="(t, i) in titleSegments"
        :class="['captivate', l.segment, i <= showIndex ? l.show : '']"
        >{{ t }}</span
      >
    </p>
    <p
      ref="definition"
      :class="[
        'subhead',
        l.segment,
        showIndex == titleSegments.length + 1 ? l.show : '',
      ]"
    >
      {{ def }}
    </p>
  </div>
</template>

<script setup lang="ts">
const titleSegments = [
  "in",
  "·",
  "cre",
  "·",
  "men",
  "·",
  "tal",
  "\n",
  "de",
  "·",
  "sign",
];

const def = "1. Designing small, positive change over time";

const el = ref(null);
const interval = 300; /* ms */

const paused = ref(true);
const t = useInterval(interval, paused);

const intersecting = useIntersect(el);

const showIndex = ref(-2);

watchEffect(() => {
  if (!intersecting.value) {
    paused.value = true;
    return;
  }
  paused.value = showIndex.value == titleSegments.length + 1;
});

watchEffect(() => {
  t.value;
  showIndex.value = showIndex.value + 1;
});
</script>

<style module="l" lang="postcss">
.segment {
  display: inline;
  position: relative;
  transition:
    margin-left 0.75s cubic-bezier(0.16, 0.53, 0.1, 1.3),
    opacity 0.5s linear;
  opacity: 0;
  margin-left: -1rem; /* sorry, I think this is computationally inefficient, but I don't want to take the time to lay the text out in absolute position */
}
.show {
  margin-left: 0;
  opacity: 1;
  /* transform: translateX(0); */
}
</style>
