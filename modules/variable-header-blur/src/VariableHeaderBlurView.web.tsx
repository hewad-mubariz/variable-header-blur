import * as React from 'react';

import { VariableHeaderBlurViewProps } from './VariableHeaderBlur.types';

export default function VariableHeaderBlurView(props: VariableHeaderBlurViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
