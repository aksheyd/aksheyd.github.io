// TypeScript 7 has no Next compiler-API plugin, so CSS side-effect imports
// need an explicit module declaration for `tsc --noEmit`.
declare module "*.css";
