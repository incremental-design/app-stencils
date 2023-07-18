import handle from './DeviceInputEventHandlers';

export default handle;

export * from './event-handlers/index';

// in-source test suites
  if (import.meta.vitest) {
    const { it, expect } = import.meta.vitest
    it('add', () => {
      expect(0).toBe(0)
      expect(1).toBe(1)
    })
  }