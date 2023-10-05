<template>
  <HeroHeadline :class="hero.headline"></HeroHeadline>
  <HeroLogotype :class="hero.logotype"></HeroLogotype>
  <HeroCTA :class="hero.cta"></HeroCTA>
  <div :class="hero.lemonLady"></div>
  <HeroSustainableGrowth
    :class="hero.sustainableGrowth"
  ></HeroSustainableGrowth>
  <div v-clip-path="{ path, interpolate }" :class="hero.trustGap"></div>
  <div :class="hero.floatingIsland"></div>
  <TestLevel :class="hero.sizzle"></TestLevel>
  <div :class="hero.step"></div>
  <div id="gallery"></div>
  <div id="services"></div>
  <div id="social-proof"></div>
  <div id="team"></div>
</template>

<script setup lang="ts">
const path: Ref<[string, ...Array<string>]> = ref([
  "M 0 0 H 100 V 100 H 0 V 0 Z",
  "M 0 0 H 200 V 50 H 0 V 0 Z",
]);

const interpolate: Ref<number> = ref(0.65);

const shouldLoop = ref(false);

// watchEffect(() => {
//   if (!shouldLoop.value) return;
//   window.requestAnimationFrame((t) => {
//     interpolate.value = Math.sin(t / 1000) / 2 + 0.5;
//     console.log(interpolate.value);
//   });
// });

onMounted(() => {
  shouldLoop.value = true;
});
</script>

<style module="hero" lang="postcss">
.headline {
  grid-row: content-start / span 1;
  grid-column: left-content-start / left-content-end;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
.logotype {
  grid-row: 5 / span 1;
  grid-column: left-content-start / left-content-end;

  /* sorry, can't use css vars from assets/breakpoint.css here */
  @media (max-width: 568px) {
    grid-column: left-content-start / right-content-end;
  }
}
.cta {
  grid-row: 6 / span 1;
  grid-column: left-content-start / left-content-end;

  @media (max-width: 768px) {
    grid-column: left-content-start / right-content-end;
  }
}
.lemonLady {
  /* background: rgb(4, 30, 78); */
  grid-column: right-content-start / right-edge;
  grid-row: top-edge-start / span 10;

  @media (max-width: 568px) {
    grid-row: content-start / span 2;
  }
}
.sustainableGrowth {
  grid-column: left-content-start / left-content-end;
  grid-row: 7 / span 1;
}
.trustGap {
  background: violet;
  height: 200px;
  grid-column: left-content-start / left-content-end;
  grid-row: 8 / span 1;
}
.floatingIsland {
  background: gray;
  height: 200px;
  grid-column: right-content-start / right-nav-end;
  grid-row: 8 / span 1;
}
.sizzle {
  /* background: orange; */
  grid-row: 10 / span 1;
  grid-column: left-edge-start / right-edge-end;

  @media (min-width: 1600px) {
    grid-column: left-content-start / left-content-end;
  }
}
.step {
  height: 200px;
  background: green;
  grid-row: 9 / span 1;
  grid-column: left-content-start / left-content-end;
}
</style>

<style module="gallery" lang="postcss"></style>
<style module="services" lang="postcss"></style>
<style module="social-proof" lang="postcss"></style>
<style module="team" lang="postcss"></style>
