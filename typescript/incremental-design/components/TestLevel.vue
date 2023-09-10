<template>
  <div ref="el" :class="test.container">
    <img
      ref="img"
      :class="test.bgIslands"
      src="~/assets/level.png"
      alt="buyer's journey"
    />
  </div>
</template>

<script setup lang="ts">
const el: Ref<HTMLElement | null> = ref(null);
const i = useIntersect({
  el,
  scroll: ref(true),
});

const img: Ref<HTMLElement | null> = ref(null);

watchEffect(() => {
  if (!i.el || !i.container || !img.value) return;
  const eC = i.el.center;
  const cC = i.container.center;
  const dY = eC.y / cC.y;
  requestAnimationFrame(() => {
    (img.value as HTMLElement).setAttribute(
      "style",
      `transform: translate(${/* 0 to -60*/ -30 * (2 - dY)}%,${
        /* -60 to 0*/ -70 * (dY - 1) + 20
      }%)`,
    );
  });
});
</script>

<style module="test" lang="postcss">
.container {
  position: relative;
  height: 240vh;
  overflow: hidden;
}

.bgIslands {
  position: absolute;
  top: 30%;
  width: 200%;
  /* height: 500%; */
}
</style>
