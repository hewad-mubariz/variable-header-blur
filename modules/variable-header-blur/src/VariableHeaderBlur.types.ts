import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the Native Variable Header Blur view.
 */
export type VariableHeaderBlurViewProps = {
  /**
   * The maximum blur intensity (usually between 0 and 50).
   * @default 20
   */
  maxBlurRadius?: number;

  /**
   * How far the blur extends (in points).
   * This is used natively to calculate the gradient falloff.
   * @default 64
   */
  fadeExtension?: number;

  /**
   * Standard React Native view styles.
   * You should usually set 'position: absolute' and a 'height' here.
   */
  style?: StyleProp<ViewStyle>;
};

/**
 * Payload for the onChange event if you decide to emit values
 * from Swift (e.g., reporting the actual height).
 */
export type ChangeEventPayload = {
  value: string;
};

/**
 * Events emitted by the Native Module.
 */
export type VariableHeaderBlurModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};
