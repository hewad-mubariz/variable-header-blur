import type { StyleProp, ViewStyle } from "react-native";

/**
 * Props for the native VariableHeaderBlur view.
 */
export type VariableHeaderBlurViewProps = {
  /**
   * Height of the blur header region.
   * Usually includes safe area top inset.
   */
  headerHeight?: number;

  /**
   * Maximum blur radius/intensity.
   * @default 16
   */
  maxBlurRadius?: number;

  /**
   * Top tint opacity.
   * @default 0.3
   */
  tintOpacityTop?: number;

  /**
   * Middle tint opacity.
   * @default 0.1
   */
  tintOpacityMiddle?: number;

  /**
   * Tint color used for the blur overlay.
   * Accepts a hex color like "#FFFFFF" or "#000000".
   * @default "#FFFFFF"
   */
  tintColor?: string;

  /**
   * Progressive blur start Y position.
   * Useful for tuning when the blur should begin.
   * Android only for now, but safe to expose cross-platform.
   */
  progressiveStartY?: number;

  /**
   * Progressive blur end Y position.
   * Useful for tuning when the blur should fade out.
   * Android only for now, but safe to expose cross-platform.
   */
  progressiveEndY?: number;

  /**
   * Standard React Native view styles.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Child content rendered behind the blur region.
   */
  children?: React.ReactNode;
};

/**
 * Payload for optional native change events.
 */
export type ChangeEventPayload = {
  value: string;
};

/**
 * Events emitted by the native module.
 */
export type VariableHeaderBlurModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};
