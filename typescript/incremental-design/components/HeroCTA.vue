<template>
  <div ref="el">
    <p :class="['assert']">
      We use
      <span :class="[s.hl, index >= 0 ? s.show : '']">art and design</span> to
      start a dialogue with the people you
      <span :class="[s.hl, index >= 1 ? s.show : '']">serve</span> at every
      stage of your growth.
    </p>
  </div>
</template>

<script setup lang="ts">
const el = ref(null);
const intersecting = useIntersect(el);

const pause = ref(true);
const index = ref(-6);
const interval = useInterval(600, pause);

watchEffect(() => {
  if (!intersecting.value) {
    pause.value = true;
  } else {
    pause.value = index.value > 2;
  }
});

watchEffect(() => {
  interval.value;
  index.value = index.value + 1;
});
</script>

<style module="s" lang="postcss">
.hl {
  /* background-position: -100%; */
  transition: all 6.5s ease-out;
  background-image: var(--background-image-highlight-light);
  background-size: 750%;
  background-position-x: 100%;
  background-repeat: no-repeat;
  background-clip: text;

  @media (prefers-color-scheme: dark) {
    background-image: var(--background-image-highlight-dark);
  }

  color: transparent;
  &.show {
    background-position-x: 0%;
  }
}
</style>
