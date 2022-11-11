<template>
  <componentBase
    is-hoverable
    is-pressable
    :is-toggleable="isToggleable"
    @state-change="handleStateChange"
  >
    <template #default>
      <div :style="fill" role="button">
        <slot name="icon-left">
          <FontAwesomeIcon v-if="iL" :icon="iL" :style="iconLeft" />
        </slot>
        <slot name="label">
          <p :style="label">
            {{ l }}
          </p>
        </slot>
        <slot name="icon-right">
          <FontAwesomeIcon v-if="iR" :icon="iR" :style="iconRight" />
        </slot>
      </div>
    </template>
  </componentBase>
</template>

<script setup lang="ts">
import useProps from "./useProps";
import componentBase, {
  State,
  StateChange,
} from "@incremental.design/component-base";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  Ref,
  watch,
  ref,
  computed,
  CSSProperties,
  ComputedRef,
  toRaw,
  onMounted,
} from "vue";
import {
  makeElevationCSSRules,
  makeFontCSSRules,
  makeShapeCSSRules,
} from "@incremental.design/theme";

const props = defineProps(useProps);
const emit = defineEmits<{
  (event: "pressing"): void;
  (event: "hovering"): void;
  (event: "toggled"): boolean;
}>();

/* if button is toggle, set toggle */
const isToggleable = computed(() => props.options?.isToggleable || false);
const isToggled = ref(false);

defineExpose({
  isToggled,
});

/* set button icon and label */

const iL: Ref<object | false> = ref(false);
const iR: Ref<object | false> = ref(false);
const l: Ref<string> = ref("");

const buttonContent = computed(() => props.options?.content);

watch(
  buttonContent,
  async (current) => {
    if (!current) return;
    const { iconLeft, iconRight, label } = current;
    l.value = label;
    iL.value = iconLeft ? iconLeft.icon : false;
    iR.value = iconRight ? iconRight.icon : false;
  },
  { immediate: true, deep: true }
);

const currentState: Ref<Array<State>> = ref([]);

const handleStateChange = (stateChange) => {
  currentState.value = (stateChange as StateChange).newState;
};

/* make inline CSS */

const buttonStyles = computed(() => props.options?.style);

const fontCSS: Ref<ReturnType<typeof makeFontCSSRules> | false> = ref(false);
const shapeCSS: Ref<ReturnType<typeof makeShapeCSSRules> | false> = ref(false);
const elevationCSS: Ref<ReturnType<typeof makeElevationCSSRules> | false> =
  ref(false);

const gridTemplateColumns: Ref<string> = ref(
  `[icon-left] min-content [label] min-content [icon-right] min-content`
);

const tL: Ref<string> = ref("translateX(0)");
const tR: Ref<string> = ref("translateX(0)");

const oL: Ref<string> = ref("1");
const oR: Ref<string> = ref("1");

watch(
  [() => buttonStyles.value, () => currentState.value, buttonContent],
  async (current) => {
    const [buttonStyles, currentState, buttonContent] = current;
    if (!buttonStyles) return;
    const { font, shape, elevation } = buttonStyles;

    const s = (() => {
      if (currentState.length === 0) return "none";
      if (currentState.includes(State.pressing)) return "pressing";
      if (currentState.includes(State.hovering)) return "hovering";
      return "none";
    })();

    isToggled.value = currentState.includes(State.toggled);

    const t = isToggled.value ? "toggled" : "notToggled";

    if (s === "pressing");
    if (s === "hovering") emit("hovering");

    fontCSS.value = { ...makeFontCSSRules(font[t][s]) };
    shapeCSS.value = { ...makeShapeCSSRules(shape[t][s]) };
    elevationCSS.value = {
      ...makeElevationCSSRules(elevation[t][s]),
    };

    if (!buttonContent) return;
    const { iconLeft, iconRight } = buttonContent;
    const animateLeft = iconLeft?.animateOnPress;
    const animateRight = iconRight?.animateOnPress;

    const { left, transformLeft, opacityLeft } = (() => {
      if (!animateLeft)
        return {
          left: "min-content",
          transformLeft: "translateX(0)",
          opacityLeft: "1",
        };
      if (animateLeft === "show") {
        return {
          left: s === "none" ? "0rem" : `2rem`,
          transformLeft: s === "none" ? "translateX(100%)" : "translateX(0)",
          opacityLeft: s === "none" ? "0" : "1",
        };
      } else {
        return {
          left: s === "none" ? `2rem` : "0rem",
          transformLeft: s === "none" ? "translateX(0)" : "translateX(100%)",
          opacityLeft: s === "none" ? "1" : "0",
        };
      }
    })();

    tL.value = transformLeft;
    oL.value = opacityLeft;

    const { right, transformRight, opacityRight } = (() => {
      if (!animateRight)
        return {
          right: "min-content",
          transformRight: "translateX(0)",
          opacityRight: "1",
        };
      if (animateRight === "show") {
        return {
          right: s === "none" ? "0rem" : `2rem`,
          transformRight: s === "none" ? "translateX(-100%)" : "translateX(0)",
          opacityRight: s === "none" ? "0" : "1",
        };
      } else {
        return {
          right: s === "none" ? `2rem` : "0rem",
          transformRight: s === "none" ? "translateX(0)" : "translateX(-100%)",
          opacityRight: s === "none" ? "1" : "0",
        };
      }
    })();

    tR.value = transformRight;
    oR.value = opacityRight;

    gridTemplateColumns.value = `[icon-left] ${left} [label] min-content [icon-right] ${right}`;
  },
  { immediate: true, deep: true }
);

const transition = "all 0.05s linear";

const padding = computed(
  () => `max(0.5rem, ${shapeCSS.value["border-radius"]})`
);

const fill: ComputedRef<CSSProperties> = computed(() => {
  return {
    ...shapeCSS.value,
    ...elevationCSS.value,
    display: "inline-grid",
    alignItems: "center",
    justifyItems: "center",
    position: "relative",
    gridTemplateColumns: gridTemplateColumns.value,
    transition,
    ...fontCSS.value,
    paddingLeft: padding.value,
    paddingRight: padding.value,
  } as CSSProperties;
});

const label: ComputedRef<CSSProperties> = computed(() => {
  return {
    gridColumn: `label / span 1`,
    transition,
  } as CSSProperties;
});

const iconShared: ComputedRef<CSSProperties> = computed(() => ({
  height: fontCSS.value["font-size"],
  boxSizing: "content-box",
}));

const iconLeft: ComputedRef<CSSProperties> = computed(() => ({
  ...iconShared.value,
  gridColumn: `icon-left / span 1`,
  transform: tL.value,
  opacity: oL.value,
  transition,
  justifySelf: "start",
}));

const iconRight: ComputedRef<CSSProperties> = computed(() => ({
  ...iconShared.value,
  gridColumn: `icon-right / span 1`,
  transform: tR.value,
  opacity: oR.value,
  transition,
  justifySelf: "end",
}));
</script>
