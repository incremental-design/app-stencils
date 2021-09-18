import { Handler, mergeWithEventInfo } from './handler-utils/';
import { DeviceInput, getDeviceInput } from './device-utils/';

declare type DeviceEvent = DeviceMotionEvent | DeviceOrientationEvent;

export const handleDevice: Handler<DeviceEvent, DeviceInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<DeviceInput>(
    event,
    getDeviceInput(event, previous)
  );
};
