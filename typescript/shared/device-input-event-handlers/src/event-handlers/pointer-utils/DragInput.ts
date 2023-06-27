export function getDragInput(
  event: DragEvent,
  previous?: DragInput
): DragInput {
  return {
    type: 'DragInput',
  };
}

export interface DragInput {
  readonly type: 'DragInput' /* this is here to speed up 'handle' function*/;
}

// drag input should contain pointer input
