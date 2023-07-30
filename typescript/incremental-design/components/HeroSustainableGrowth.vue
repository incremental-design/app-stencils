<template>
  <div ref="el">
    <p class="assert">
      Sustainable growth is
      <span :class="[s.hl, index >= 0 ? s.show : '']">incremental.</span>
    </p>
    <p class="body">
      Whether you're making the next big thing or starting a social movement,
      every iteration of your idea winds around your
      <span :class="[s.hl, index >= 1 ? s.show : '']">story</span>. Each is
      shaped by
      <span :class="[s.hl, index >= 2 ? s.show : '']">dialogue</span> you
      conduct with the people you want to help. All layer upon the
      <span :class="[s.hl, index >= 3 ? s.show : '']">trust</span> you grow. We
      use <span :class="[s.hl, index >= 4 ? s.show : '']">design</span> to help
      you bear fruit, branch out and prune what's holding you back.
    </p>
  </div>
</template>

<script setup lang="ts">
const el = ref(null);

const index = useHighlight(el, 600, -2, 2);
</script>

<style module="s" lang="postcss">
@import url(~/assets/highlight.css);
</style>
