import { watch, Ref, ref, ComponentInternalInstance, onUnmounted } from 'vue'

import {
  Defs,
  PathArray,
  Runner,
  Path,
  Polygon,
} from '@svgdotjs/svg.js';

/**
 * @param pathMask - the string path used in the `<path></path>` tag (i.e.) `<path d="..."></path>`of the SVG that is bing used as the clipMask.
 * 
 * @param interpolate - the number between 0 and 1 that determines how to blend between the paths in pathMask
 * 
 * @param defs - the <defs> tag inside the SVG in which to place the interpolated path
 *
 * @param interpolatedPath - the {@link Path} or {@link Polygon} to interpolate
 * 
 * @param ci - the {@link ComponentInternalInstance} of the component that uses this composable. This is used to bind to the component's {@link onMounted } and {@link onUnmounted} hook.
 *
 */
export default function useInterpolatePath(
  pathMask: Ref<string | Array<string>>,
  interpolate: Ref<number>,
  defs: Ref<Defs | null>,
  interpolatedPath: Ref<Polygon | Path | undefined>,
  ci: ComponentInternalInstance,
): void {

  const runner: Ref<Runner | null> = ref(null)

  const clearRunner = () => {
    if (runner.value) {
      runner.value.persist(undefined)
      runner.value.finish()
    }
  }

  const unwatchDefs = watch(
    [
      () => defs.value,
      () => pathMask.value
    ],
    (current) => {

      const [d /* (d)efs */, m /* path(m)ask */] = current

      clearRunner();

      if (!d) return;

      const stringPath = typeof m === 'string'

      const singlePath = stringPath || m.length < 2

      const pa: PathArray = new PathArray(stringPath ? m : m[0]).size(1, 1) /* this magic number resizes any path so that it fits in a 1x1 px square. Combined with the 'clipPathUnits="objectBoundingBox"' attribute, it makes the clip mask stretch across whatever you put inside it */

      /* add the path by which to clip to defs */

      const p = d.path(pa)

      interpolatedPath.value = p;

      if (!singlePath) {

        const ppa /* (p)lot(p)oint(a)rrays */ = (m as Array<string>).slice(1).map(ps /* (p)ath(s)tring */ => new PathArray(ps).size(1, 1) /* we HAVE to convert to poly because svgjs can't morph paths with different numbers of points in them. Maybe at some point I'll write the code to make all paths have same number of points */
        );

        runner.value = new Runner()
          .element(p)
          .ease('-') /* use linear ease because we will use interpolate to control easing */
          .persist(true) /* don't delete the runner when it hits the endpoint of the animation, because we need to be able to scrub it */

        ppa.map(p => (runner.value as Runner).plot(p)) // todo: fix bug where only the FIRST call to plot() is actually run. right now, if ppa has more than two paths, only the first two will morph. try scheduling the runner with timeline.after

      } else {
        runner.value = null
      }
    }
  )

  const unwatchInterpolate = watch(
    [
      () => interpolate.value,
      () => runner.value
    ],
    (current) => {
      const [i /* (i)nterpolate */, r /* (r)unner */] = current
      if (!r) return;
      if (!interpolatedPath.value) return; /* this is just here as a type guard ... this branch should never actually execute */

      requestAnimationFrame(() => r.progress(i))

    },
    { deep: false }
  )

  onUnmounted(() => {
    unwatchDefs()
    unwatchInterpolate()
  }, ci)

  // .animate.plot

}