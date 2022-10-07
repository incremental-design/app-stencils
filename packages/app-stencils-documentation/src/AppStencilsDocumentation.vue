<template>
  <div :class="grid.pageGrid" />
</template>

<script lang="ts" setup>
import grid from "@incremental.design/page-grid";
import "@incremental.design/page-grid/dist/style.css"; /* todo: fix this ... its unintuitive to have to import BOTH the default export AND the style.css */

const props = defineProps({});
const emits = defineEmits({});
</script>
