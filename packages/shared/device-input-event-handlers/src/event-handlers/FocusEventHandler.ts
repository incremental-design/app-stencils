import { Handler, mergeWithEventInfo } from './handler-utils';
import { FocusInput, getFocusInput } from './focus-utils';

// blur, focus, focusin, focusout, select??

export const handleFocus: Handler<FocusEvent, FocusInput> = (
  event,
  previous
) => {
  return mergeWithEventInfo<FocusInput>(
    event,
    previous && previous.input.type === 'FocusInput'
      ? getFocusInput(event, previous.input)
      : getFocusInput(event)
  );
};

// even through select is a window event, it has some overlaps with focus, because selected text is focused if the interface itself is focus driven. It might be useful to handle it
