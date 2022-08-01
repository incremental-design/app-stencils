import { Handler, mergeWithEventInfo, EventInfo } from './handler-utils';
import { PointerInput, getPointerInput } from './pointer-utils';

/**
 * HandleMouse extracts the useful information from a sequence of mouse events.
 *
 * @param event - Any {@link MouseEvent}
 *
 * @param previous - The previous {@link EventInfo}<{@link PointerInput}> object that was returned from this function. This parameter is optional. If you supply it, it will diff the event with the previous event and include the result in the returned {@link EventInfo}<{@link PointerInput}>} object.
 *
 * @returns a {@link EventInfo}<{@link PointerInput}> object
 *
 * @example
 * ```vue
 * <template>
 *  <div @="MouseEventHandlers">
 *    <!-- ... -->
 *  </div>
 * </template>
 *
 * <script lang="ts">
 *  import { defineComponent, reactive } from 'vue';
 *
 *  import { handleMouse } from '@incremental.design/device-input-event-handlers';
 *
 *  export default defineComponent({
 *    setup(){
 *
 *      const DataAndComputed: any = reactive({
 *       previous: false,
 *      });
 *
 *      const H = (e: Event) => { DataAndComputed.previous = handleMouse(e, DataAndComputed.previous) };
 *
 *      const MouseEventHandlers = {
 *        auxclick: H,
 *        click: H,
 *        contextmenu: H,
 *        dblclick: H,
 *        mousedown: H,
 *        mouseenter: H,
 *        mouseleave: H,
 *        mosueout: H,
 *        mouseover: H,
 *        mouseup: H,
 *      };
 *
 *      return { MouseEventHandlers, DataAndComputed };
 *    }
 *  });
 * </script>
 * ```
 *
 */
export const handleMouse: Handler<MouseEvent, PointerInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo(
    event,
    previous && previous.input.type === 'PointerInput'
      ? getPointerInput(event, previous.input)
      : getPointerInput(event)
  );
};

// todo: support auxclick, contextmenu, webkitmouseforcewillbegin, webkitmouseforcedown, webkitmouseforcechanged, webkitmouseforceup

// this is how vue handles mod keys on mouse events: https://v3.vuejs.org/guide/events.html#system-modifier-keys

// this is how vue handles left, middle, right on mouse events: https://v3.vuejs.org/guide/events.html#mouse-button-modifiers
