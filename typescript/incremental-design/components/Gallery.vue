<template>
  <div :class="gallery.container">
    <ClipPath
      v-for="bubble in bubbles"
      :key="bubble.background"
      :background="bubble.background"
      :interpolate="bubble.interpolate"
      :paths="paths"
      :class="gallery.bubble"
    ></ClipPath>
  </div>
</template>

<script setup lang="ts">
const paths: Ref<[string, ...Array<string>]> = ref([
  "M666.548781,1200 C893.786674,1200 928,827.934204 928,533.364902 C928,238.795601 743.787291,0 516.549398,0 C289.311505,0 0,238.795601 0,533.364902 C0,680.450884 109.531634,846.858759 247.50096,976.620334 C385.842996,1106.73245 552.776576,1200 666.548781,1200 Z",
  "M715.5,943 C914.5,774.5 1134,806.5 1134,508 C1134,209.5 741,0 516.549398,0 C157,0 0,111 0,530 C0,677.085982 19.0306736,1030.73842 157,1160.5 C295.342036,1290.61211 516.5,1111.5 715.5,943 Z",
  "M843.685208,1142.97418 C993.734739,1051.53625 1040.25009,796.106367 931.214101,562.045132 C822.178109,327.983896 746.440399,0 519.12747,0 C291.814542,0 143.454064,253.442102 48.9228593,503.902532 C-0.40493415,634.596522 -60.6132984,938.729667 136.451752,1078.3713 C333.516803,1218.01292 693.635677,1234.41212 843.685208,1142.97418 Z",
  "M788.437261,925.573416 C947.153314,811.401415 1200,461.874851 1200,321.663622 C1200,181.452392 1033.77122,158.417691 710.330937,71.7871811 C386.890651,-14.8433283 279.744797,-47.893118 88.9851238,116.855076 C-11.0582881,203.256836 -88.2561478,619.111729 213.15415,874.496468 C514.564448,1129.88121 629.721207,1039.74542 788.437261,925.573416 Z",
]);

const backgrounds = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
]; // todo: replace with image urls

const bubbles: ComputedRef<
  Array<{
    background: string;
    interpolate: number;
  }>
> = computed(() => {
  return backgrounds.map((bg, index) => {
    return {
      background: bg,
      interpolate: index / paths.value.length, // todo: change this based on scroll pos
    };
  });
});
</script>

<style module="gallery">
.container {
  display: grid;
  grid-template-columns: [left-edge] 1fr [center-line] 1fr [right-edge];
  grid-auto-rows: 30vh;
}
.bubble {
  grid-row: span 1;
  grid-column: left-edge / center-line;
}
</style>
