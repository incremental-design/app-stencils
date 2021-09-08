import { Handler } from './';

export const stopAndPrevent: Handler<void> = (
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
