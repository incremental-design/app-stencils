<template>
  <div v-intersect="{ onIntersect }">
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
const pause = ref(true);

const onIntersect = (i) => {
  pause.value = !i.intersecting;
};

const index = useHighlight(pause, 600, -6, 2);
</script>

<style module="s" lang="postcss">
@import url(~/assets/highlight.css);
</style>
