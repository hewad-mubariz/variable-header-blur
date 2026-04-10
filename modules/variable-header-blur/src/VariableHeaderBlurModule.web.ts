import { registerWebModule, NativeModule } from 'expo';

import { ChangeEventPayload } from './VariableHeaderBlur.types';

type VariableHeaderBlurModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
}

class VariableHeaderBlurModule extends NativeModule<VariableHeaderBlurModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
};

export default registerWebModule(VariableHeaderBlurModule, 'VariableHeaderBlurModule');
