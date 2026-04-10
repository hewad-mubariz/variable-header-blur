import { NativeModule, requireNativeModule } from 'expo';

import { VariableHeaderBlurModuleEvents } from './VariableHeaderBlur.types';

declare class VariableHeaderBlurModule extends NativeModule<VariableHeaderBlurModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<VariableHeaderBlurModule>('VariableHeaderBlur');
