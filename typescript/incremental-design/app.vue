<template>
  <div ref="viewport" :class="g.pageGrid">
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
// useCssModule() // see: https://vuejs.org/api/sfc-css-features.html#css-modules
import g from "@incremental.design/shared-page-grid/pageGrid.module.css";

/**
 * track window size and color scheme. Provide refs to components, so that they can animate
 *
 * we are NOT using a state manager here, because that would introduce latency.
 */
const isDarkMode = usePreferredDark();
provide(isDarkModeInjectable, isDarkMode);
</script>
