export * from './CompositionListeners';
export * from './FocusListeners';
export * from './KeyboardListeners';
export * from './MouseListeners';
export * from './PasteboardListeners';
export * from './ScrollListeners';
export * from './TouchListeners';
export * from './WindowListeners';

// todo: recategorize according to https://developer.mozilla.org/en-US/docs/Web/API/Event#introduction (see all the interfaces that extend the event interface)?

// todo: MUST include following events (because vetur lists them out):
// abort, blur, canplay, canplaythrough, change, click, contextmenu, dblclick, drag, dragend, dragenter, dragleave, dragover, dragstart, drop, durationchange, emptied, ended,error, focus, formchange, forminput, input, invalid, keydown, keypress, keyup, load, loadeddata, loadedmetadata, loadstart, mousedown, mousenter, mouseleave, mousemove, mouseout, mouseover, mouseup, mousewheel, pause, play, playing, progress, ratechange, readystatechange, reset, resize, scroll, seeked, seeking, select, show, stalled, submit, suspend, timeupdate, volumechange, waiting

// see: https://github.com/microsoft/TypeScript/blob/afe9cf5307e3e34c86c3bc6d3a5be5f9033be528/lib/lib.dom.d.ts#L5550

// todo: make sure you listen for modifiers. see: https://github.com/vuejs/vue-next/blob/bc7dd93f9223e8c5809ad7b95fcf8b2414181b91/packages/runtime-dom/src/directives/vOn.ts#L14
