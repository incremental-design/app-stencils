<template>
  <div :class="cp.container">
    <slot name="default" :clipPath="cpChild"></slot>
    <svg ref="svg" width="0" height="0"></svg>
  </div>
</template>

<script setup lang="ts">
// todo: consider renaming this from 'ClipPath' to 'ClipPathComp' or something because otherwise people will confuse this with <clipPath> svg element

import { Path, PathArray, PathCommand, Svg, SVG } from "@svgdotjs/svg.js";
import { Props, Emits } from "./ClipPath";

const props = withDefaults(defineProps<Props>(), {
  background: "none",
  paths: () => ["M 0 0 H 100 V 100 H 0 V 0 Z"],
  interpolate: 0,
});

const emit = defineEmits<Emits>();

interface Slots {
  default(props: { clipPath: string }): any; // todo: pass curr path as prop
}

const slots = defineSlots<Slots>();

const pathsValid = (p: unknown): p is [string, ...Array<string>] => {
  if (!Array.isArray(p)) return false;
  return p.length > 0;
};

/* use this one path to compute */
let path: Path;

onMounted(() => {
  path = SVG().path();
  /* path should go out of scope and get GC'd without having to do any sort of tear down */
});

const scalePathCommand = (
  scaleFactor: [number, number],
  c: PathCommand,
): PathCommand => {
  switch (c[0]) {
    /* close curve */
    case "z":
    case "Z":
      return c;
    /* horizontal line */
    case "h":
    case "H":
      return [c[0], c[1] * scaleFactor[0]];
    /* vertical line */
    case "v":
    case "V":
      return [c[0], c[1] * scaleFactor[1]];
    /* diagonal line or bezier path continuation */
    case "M":
    case "m":
    case "L":
    case "l":
    case "t":
    case "T":
      return [c[0], c[1] * scaleFactor[0], c[2] * scaleFactor[1]];
    /* quadratic bezier */
    case "S":
    case "s":
    case "Q":
    case "q":
      return [
        c[0],
        c[1] * scaleFactor[0],
        c[2] * scaleFactor[1],
        c[3] * scaleFactor[0],
        c[4] * scaleFactor[1],
      ];
    /* cubic bezier */
    case "C":
    case "c":
      return [
        c[0],
        c[1] * scaleFactor[0],
        c[2] * scaleFactor[1],
        c[3] * scaleFactor[0],
        c[4] * scaleFactor[1],
        c[5] * scaleFactor[0],
        c[6] * scaleFactor[1],
      ];
    /* arc */
    case "A":
    case "a":
      return [
        c[0],
        c[1],
        c[2],
        c[3],
        c[4],
        c[5],
        c[6] * scaleFactor[0],
        c[7] * scaleFactor[1],
      ]; // https://www.nan.fyi/svg-paths/arcs
    /* unknown type */
    default:
      return c;
  }
};

/* validate and scale paths */
const paths: ComputedRef<[PathArray, ...Array<PathArray>] | undefined> =
  computed(() => {
    if (!pathsValid(props.paths))
      throw new Error("props.paths must contain at least one SVG path");

    if (!path) return;

    // todo: normalize paths such that all paths have same number and type of commands ... there are several good solutions. consider using diff eq and local minima + bezier curves, and also make sure you spawn worker threads to run the calcs.

    // todo: use https://github.com/svgdotjs/svg.topath.js to convert any svg shape to a path

    /* scale X and Y of all the paths by the 1/x and 1/y of largest bounding box */
    const scaleFactor: [number, number] = props.paths
      .map((ps) => {
        const { x, y, w, h } = path.plot(ps).bbox();
        return [
          x + w,
          y + h,
        ]; /* this preserves the offset that a given curve has */ // todo: check this assumption
      })
      .reduce(
        (acc, curr) => {
          return [
            acc[0] >= curr[0] ? acc[0] : curr[0],
            acc[1] >= curr[1] ? acc[1] : curr[1],
          ];
        },
        [0, 0],
      )
      .map((max) => 1 / max) as [number, number];

    return props.paths.map(
      (ps) =>
        path
          .plot(ps)
          .array()
          .map((pc) => {
            const pcClone = pc.map((c) => c) as PathCommand;
            return scalePathCommand(scaleFactor, pcClone);
          }) as PathArray,
    ) as [
      PathArray,
      ...Array<PathArray>,
    ]; /* deep clone to ensure that path arrays are not references to path's current path array */
  });

/* validate interpolate */
const interpolate: ComputedRef<number> = computed(() => {
  if (!paths.value) return props.interpolate;
  if (props.interpolate < 0 || props.interpolate > paths.value.length - 1)
    throw new Error(
      `props.interpolate must be greater than or equal to 0 and less than or equal to ${
        paths.value.length - 1
      }, received ${props.interpolate}`,
    );

  return props.interpolate;
});

const interpolatePaths = (
  p0: PathArray,
  p1: PathArray,
  weight: number,
): PathArray => {
  if (
    p0.length === p1.length &&
    p0.every((pathCommand, i) => (pathCommand[0] = p1[i][0]))
  ) {
    path
      .plot(p0)
      .animate(1)
      .plot(p1)
      .step(weight); /* hijack animate to tween the path array */
    const pOut = path.array();
    path.timeline().finish();
    return pOut;
  } else {
    throw new Error(
      "paths with different numbers of points or different commands are not supported",
    ); // todo: IF actually needed, add in support
  }
};

/* update path when interpolate or paths change */
const updatePath = (
  paths: [PathArray, ...Array<PathArray>],
  interpolate: number,
): string => {
  const floor = Math.floor(interpolate);

  return (
    interpolate === floor
      ? paths[interpolate]
      : interpolatePaths(paths[floor], paths[floor + 1], interpolate - floor)
  )
    .map((pc) => pc.join(" "))
    .join(",");
};

const id = ref("");
onBeforeMount(() => {
  id.value = `clipMask${Math.random().toString(16).slice(2, 9)}`;
});

const url: ComputedRef<string> = computed(() => {
  return `url(#${id.value})`;
});

const clipPath: ComputedRef<string> = computed(() => {
  if (!paths.value) return "";
  return `${updatePath(paths.value, interpolate.value)}`;
});

/* get a reference to SVG element, and then create a clip path as a child */
const svg: Ref<HTMLElement | null> = ref(null);
const pathEl: Ref<SVGElement | null> =
  ref(null); /* for some dumb reason vue can't ref nested SVG els??? */

onMounted(() => {
  if (!svg.value) return;
  const clipPathEl = svg.value
    .appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"))
    .appendChild(
      document.createElementNS("http://www.w3.org/2000/svg", "clipPath"),
    );

  clipPathEl.setAttribute("id", id.value);
  clipPathEl.setAttribute("clipPathUnits", "objectBoundingBox");

  pathEl.value = clipPathEl.appendChild(
    document.createElementNS("http://www.w3.org/2000/svg", "path"),
  );
});

onBeforeUnmount(() => {
  document.removeChild(svg.value as HTMLElement); // todo: see if vue tears down the appended children of svg element without this
});

const cpChild = ref("");

/* and finally, set the path of pathEl */
watchEffect(() => {
  if (!pathEl.value || !clipPath.value) return;
  pathEl.value.setAttribute("d", clipPath.value);
  /* don't forget to trigger path change event and pass the path to scoped slot as well */
  emit("pathChange", clipPath.value);
  cpChild.value = clipPath.value; // todo: see if we can avoid duplicating this reactive variable with watchEffect flush option. see: https://vuejs.org/api/reactivity-core.html#watcheffect
});

// watch(clipPath, (curr, prev) => {
//   if (!pathEl.value || !clipPath) return;
//   emit("pathChange", { old: prev || null, new: curr || null });
// });
</script>

<style module="cp">
.container {
  background: v-bind(background);
  background-size: cover;
  clip-path: v-bind(url);
}
</style>
