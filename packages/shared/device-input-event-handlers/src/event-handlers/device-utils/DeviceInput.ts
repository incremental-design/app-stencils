export function getDeviceInput(
  event: DeviceMotionEvent | DeviceOrientationEvent,
  previous?: DeviceInput
): DeviceInput {
  return {
    type: 'DeviceInput',
  };
}

export interface DeviceInput {
  readonly type: 'DeviceInput' /* this is here to speed up the 'handle' function */;
  // need to get duration for device motion event ... but not for device orientation
}
