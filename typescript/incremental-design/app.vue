<template>
  <div ref="viewport" :class="g.pageGrid">
    <NuxtPage></NuxtPage>
  </div>
</template>

<script setup lang="ts">
// useCssModule() // see: https://vuejs.org/api/sfc-css-features.html#css-modules
import g from "@incremental.design/shared-page-grid/pageGrid.module.css";
import { RegisterObserve } from "composables/Injectables";

/**
 * track window size, scroll, and color scheme. Provide refs to components, so that they can animate
 *
 * we are NOT using a state manager here, because that would introduce latency.
 */

const viewport = ref(null);
const viewportWidth = ref(0);
const viewportHeight = ref(0);

useResizeObserver(viewport, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  viewportWidth.value = width;
  viewportHeight.value = height;
}); /* in this instance, you could also useWindowSize. see: https://vueuse.org/core/useWindowSize/ */

provide(viewportWidthInjectable, viewportWidth);
provide(viewportHeightInjectable, viewportHeight);

const isDarkMode = usePreferredDark();
provide(isDarkModeInjectable, isDarkMode);

const { x, y } = useWindowScroll();
provide(scrollXInjectable, x);
provide(scrollYInjectable, y);

// todo: track tilt

/**
 * make an intersection observer for the window. Provide a function that takes an element and a callback that will be run when the element is visible.
 *
 * we don't use https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver in this site because it creates a whole new intersection observer every time it is used. I'm not actually sure if creating just one intersection observer actually conserves resources, but it couldn't hurt, right??
 */

const intersectionObserver: Ref<IntersectionObserver | false> = ref(false);

const intersectionCallbacks: Map<
  Element,
  (e: IntersectionObserverEntry) => void
> = reactive(
  new Map(),
); /* vue recommends using ref! see: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive */

/* when intersection observer runs, it passes a list of elements that have changed from not intersecting to intersecting, and intersecting to not intersecting. This function runs the callback that corresponds to each of those elements */
const onIntersect = (es: Array<IntersectionObserverEntry>) => {
  es.forEach((e) => {
    const cb = intersectionCallbacks.get(
      e.target,
    ); /* if timing isn't critical, you can use a https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback */

    if (cb) cb(e);
  });
};

onBeforeMount(() => {
  intersectionObserver.value = new IntersectionObserver(onIntersect, {
    rootMargin:
      "100px" /* an element is intersecting when it is within 100px of viewport */, // todo: make this configurable
  });
});

onUnmounted(() => {
  if (intersectionObserver.value) intersectionObserver.value.disconnect();
  intersectionObserver.value = false;
});

//todo: get rid of observe inject once vue plugin is complete

/**
 *
 * @param el - the element to observe
 * @param cb - the function to run whenever the element starts or stops intersecting
 *
 * @returns - a callback t
 */
const observeIntersection: RegisterObserve = (el, cb) => {
  intersectionCallbacks.set(el, cb);
  if (intersectionObserver.value) intersectionObserver.value.observe(el);

  return () => {
    intersectionCallbacks.delete(el);
  };
};
// start here: figure out how to provide a function that registers elements and their corresponding callbacks

provide(observeIntersectionInjectable, observeIntersection);
</script>
