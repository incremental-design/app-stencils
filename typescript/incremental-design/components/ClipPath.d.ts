// we have to use this file because otherwise volar complains about

/**
 * - {@link background} - css background property
 * 
 * - {@link paths} - an array of one or more SVG path command strings (e.g. "M 0 0 H 100 V 100 H 0 V 0 Z")
 * 
 * - {@link interpolate} - a number between 0 and {@link paths | paths.length} - 1, where the number indicates which path to use. If interpolate is not a whole number, then the path to use will be an interpolation between path[Math.floor(interpolate)] and path[math.Ceil(interpolate)]
 */
export interface Props {
    background?: string;
    paths?: [string, ...Array<string>];
    interpolate?: number;
  }

/**
 * when the path changes, emit an event containing the old and new path, i.e.:
 *
 * ```vue
 * <template>
 *  <clipPath @pathChange="onPathChange"></clipPath>
 * </template>
 * 
 * <script>
 * 
 *  const onPathChange = (paths: Exclude<{old: string | null, new: string | null}, {old: null, new: null}>) => {
 *    // do something with old and new paths
 *  }
 * 
 * </script>
 * ```
 */
export interface Emits {
    (
      e: "pathChange",
      p: Exclude<
        { old: string | null; new: string | null },
        { old: null; new: null }
      >,
    ): void;
  }