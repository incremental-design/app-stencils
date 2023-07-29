<template>
  <B ref="el" :is-hoverable="true" @state-change="handleStateChange">
    <template #default>
      <p
        v-for="(headline, index) in headlines"
        :key="index"
        :class="[
          'hook',
          $style.headline,
          index == current - 1 || (index == 3 && current == 0)
            ? $style.before
            : index == current
            ? ''
            : $style.after,
        ]"
      >
        {{ headline }}
      </p>
    </template>
  </B>
</template>

<script setup lang="ts">
import B, { StateChange } from "@incremental.design/vue3-component-base";
import {
  ObserveCb,
  RegisterObserve,
  UnobserveCb,
  observeIntersectionInjectable,
} from "../composables/Injectables";

/* I decided not to use props for these values, since this component isn't being reused, and I'd rather read less LOC than more */
const headlines = [
  "Close the Trust Gap",
  "Grow Your Community",
  "Shape Dialogue",
  "Tell Your Story",
];

const transitionCurrent = `all ${400}ms cubic-bezier(.16,.53,.06,1.4)`;

const transitionNotCurrent = `all ${600}ms cubic-bezier(.16,.53,.06,1.4)`;

const current = ref(0);
const intersecting = ref(false);
const hovering = ref(false);

const handleStateChange = (s: StateChange) => {
  hovering.value = s.newState.length == 1;
};

const el: Ref<{ BCR: HTMLElement } | null> = ref(null);

const oi = inject(observeIntersectionInjectable) as RegisterObserve;
const onIntersect: ObserveCb = (e) => {
  intersecting.value = e.isIntersecting;
};

const paused = ref(false);

watchEffect(() => {
  if (intersecting.value == false) {
    paused.value = true;
    return;
  }

  paused.value = hovering.value;
});

let clear: () => void;
let cb: UnobserveCb;

onMounted(() => {
  const id = setInterval(() => {
    if (paused.value) return;
    current.value = (current.value + 1) % headlines.length;
  }, 4500);

  clear = () => {
    clearInterval(id);
  };

  if (!el.value)
    return; /* should NEVER execute ... here as a type guard only */
  cb = oi(el.value.BCR, onIntersect);
});

onUnmounted(() => {
  clear();
  cb();
});
</script>

<style module lang="postcss">
.headline {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: v-bind(transitionCurrent);
}

.before,
.after {
  opacity: 0;
  transition: v-bind(transitionNotCurrent);
}
.before {
  transform: translateY(-100%) scale(85%);
  transform-origin: bottom;
}
.after {
  transform: translateY(100%) scale(85%);
  transform-origin: top;
  opacity: 0;
}
</style>
