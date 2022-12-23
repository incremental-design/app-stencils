export function getFocusInput(
  event: FocusEvent,
  previous?: FocusInput
): FocusInput {
  return {
    type: 'FocusInput',
  };
}

export interface FocusInput {
  readonly type: 'FocusInput' /* this is here to speed up the handle function */;
  // need to get duration of focus event
}
