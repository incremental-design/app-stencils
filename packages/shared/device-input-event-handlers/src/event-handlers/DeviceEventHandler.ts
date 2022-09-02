import { Handler, mergeWithEventInfo, EventInfo } from './handler-utils';
import { DeviceInput, getDeviceInput } from './device-utils';

declare type DeviceEvent = DeviceMotionEvent | DeviceOrientationEvent;

/**
 * Handles {@link DeviceEvent}s. Turns them into {@link EventInfo}<{@link DeviceInput}>. Tracks the change between successive {@link DeviceInput}s.
 *
 * @param event - any {@link DeviceEvent}
 * @param previous - the {@link EventInfo}<{@link DeviceInput}> that was returned the last time this function ran. This parameter is optional
 *
 * @returns 
 * {@link EventInfo}<{@link DeviceInput}>
*/
export const handleDevice: Handler<DeviceEvent, DeviceInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<DeviceInput>(
    event,
    previous && previous.input.type === 'DeviceInput'
      ? getDeviceInput(event, previous.input)
      : getDeviceInput(event)
  );
};
