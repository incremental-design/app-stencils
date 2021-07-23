import { Listener } from './Listener';

export const stopAndPrevent: Listener<void> = (
  e,
  stopPropogation = true,
  preventDefault = true
) => {
  if (stopPropogation) {
    e.stopPropagation();
  }
  if (preventDefault) {
    e.preventDefault();
  }
};
