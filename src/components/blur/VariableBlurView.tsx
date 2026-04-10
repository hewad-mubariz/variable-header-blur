import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";
import { ViewProps } from "react-native";

interface Props extends ViewProps {
  maxBlurRadius?: number;
  fadeExtension?: number;
  tintOpacityTop?: number;
  tintOpacityMiddle?: number;
  children?: React.ReactNode; // Explicitly allow children
}

const NativeView = requireNativeViewManager("VariableHeaderBlur");

export default function VariableHeaderBlurView({ children, ...props }: Props) {
  return <NativeView {...props}>{children}</NativeView>;
}
