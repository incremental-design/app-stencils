import { Handler, mergeWithEventInfo, EventInfo } from './handler-utils/';
import { PointerInput, getPointerInput } from './pointer-utils';

/**
 * HandleTouch extracts the useful information from a sequence of touch events.
 *
 * @param event - Any {@link TouchEvent}
 *
 * @param previous - The previous {@link EventInfo}<{@link PointerInput}> object that was returned from this function. This parameter is optional. If you supply it, it will diff the event with the previous event and include the result in the returned {@link EventInfo}<{@link PointerInput}> object.
 *
 * @returns a {@link EventInfo}<{@link PointerInput}> object
 *
 * @example
 * ```vue
 * <template>
 *  <div @="TouchEventHandlers">
 *    <!-- ... -->
 *  </div>
 * </template>
 *
 * <script lang="ts">
 *  import { defineComponent, reactive } from 'vue';
 *
 *  import { handleTouch } from '@incremental.design/device-input-event-handlers';
 *
 *  export default defineComponent({
 *    setup(){
 *
 *      const DataAndComputed: any = reactive({
 *       previous: false,
 *      });
 *
 *      const H = (e: Event) => handleTouch(e, DataAndComputed.previous);
 *
 *      const TouchEventHandlers = {
 *        touchcancel: H,
 *        touchend: H,
 *        touchmove: H,
 *        touchstart: H
 *      };
 *
 *      return { TouchEventHandlers, DataAndComputed };
 *    }
 *  });
 * </script>
 * ```
 *
 */
export const handleTouch: Handler<TouchEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(
    event,
    previous && previous.type === 'PointerInput'
      ? getPointerInput(event, previous.input)
      : getPointerInput(event)
  );
};
