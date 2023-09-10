<template>
  <div ref="el">
    <p ref="title">
      <span
        v-for="(t, i) in titleSegments"
        :class="['captivate', l.segment, i <= showIndex ? l.show : '']"
        >{{ t }}</span
      >
      <Logo
        :class="[
          'captivate',
          l.segment,
          showIndex >= titleSegments.length ? l.show : '',
        ]"
        style="padding-left: 0.5rem; top: 0.5rem; width: 4.5rem; height: 4.5rem"
      ></Logo>
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

const el: Ref<HTMLElement | null> = ref(null);
const interval = 300; /* ms */

const paused = ref(true);
const t = useInterval(interval, paused, -2, titleSegments.length + 1);

const i = useIntersect({
  el,
});

const showIndex = ref(-2);

watchEffect(() => {
  if (!i.intersecting) {
    paused.value = true;
    return;
  }
});

watchEffect(() => {
  showIndex.value = t.value;
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
