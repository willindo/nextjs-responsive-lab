// Prevents crashes if dev-tools imports exist
module.exports = new Proxy({}, {
  get: () => () => null
});
