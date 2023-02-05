exports.default = async function loadVitestNode() {
  /* smh we need this shim here to force nx to dynamic import vitest/node. If we try do to this in a .ts file, it will try to require() it, even if we ask it to dynamic import */
  const vn = await import('vitest/node');

  console.log(vn);

  return vn;
};
