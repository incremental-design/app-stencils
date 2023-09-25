<template>
  <canvas ref="cv" width="500" height="500" alt="test rive" />
</template>

<script setup lang="ts">
const cv: Ref<HTMLCanvasElement> = ref(null);

useRive(cv, "/isle2.riv");
</script>

<style module="test" lang="postcss"></style>
