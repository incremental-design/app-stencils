<template>
  <div :class="$style.container"></div>
  <slot name="default"></slot>
</template>

<script setup lang="ts">
// todo: make this a prop
const background = ref("none");
</script>

<style module>
.container {
  background: v-bind(background);
}
</style>
