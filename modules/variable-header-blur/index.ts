// Reexport the native module. On web, it will be resolved to VariableHeaderBlurModule.web.ts
// and on native platforms to VariableHeaderBlurModule.ts
export { default } from './src/VariableHeaderBlurModule';
export { default as VariableHeaderBlurView } from './src/VariableHeaderBlurView';
export * from  './src/VariableHeaderBlur.types';
