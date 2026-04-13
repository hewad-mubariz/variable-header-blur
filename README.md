# Variable Header Blur (Expo Module)

Cross-platform native header blur for Expo apps:

- **iOS:** true variable blur powered by `UIVisualEffectView` + `variableBlur` filter
- **Android:** progressive blur/tint header powered by [Haze](https://github.com/chrisbanes/haze)

Designed for frosted headers where blur intensity fades from top to bottom.

---

## ✨ Features

- Native `VariableHeaderBlurView` for **iOS + Android**
- Progressive top-to-bottom blur gradient
- Configurable tint gradient (`tintOpacityTop`, `tintOpacityMiddle`)
- Adjustable blur strength (`maxBlurRadius`)
- Configurable header region (`headerHeight`)
- Android-only advanced tuning (`tintColor`, `progressiveStartY`, `progressiveEndY`)

---

## 📸 Demo

### iOS

https://github.com/user-attachments/assets/25d221f3-ccb7-4dfd-a80a-f30a3dbd869c

### Android

https://github.com/user-attachments/assets/28efc49f-3aca-45d3-991c-512188aca9ed

## 🧠 Implementation Notes

### iOS implementation

Based on [nikstar/VariableBlur](https://github.com/nikstar/VariableBlur):

- `UIVisualEffectView` with obfuscated private `variableBlur` filter
- Gradient mask drives blur intensity per pixel
- SwiftUI wrapper layered inside an Expo `ExpoView`

### Android implementation (Haze)

Android uses the Haze pipeline inside a Compose-backed native view:

- `hazeSource(state)` marks the content source layer
- `hazeEffect(state)` applies blur + tint
- `HazeProgressive.verticalGradient(...)` controls progressive blur falloff
- Additional Canvas gradient aligns tint transition with blur ramp

This gives a close visual analogue to iOS progressive headers on Android.

---

## ⚠️ Important Notes

### 1) Requires a development build

This module contains custom native code, so it does **not** work in Expo Go.

```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

## 🚀 Installation

### 1) Place module in project

```
modules/variable-header-blur
```

### 2) Add dependency

Add to app `package.json`:

```json
{
  "dependencies": {
    "variable-header-blur": "file:./modules/variable-header-blur"
  }
}
```

Then install:

```bash
yarn install
```

### 3) Generate native projects

```bash
npx expo prebuild

npx expo run:android
npx expor run:ios
```

---

## 🧩 Usage

```tsx
import { VariableHeaderBlurView } from "variable-header-blur";

<VariableHeaderBlurView
  headerHeight={HEADER_TOTAL_HEIGHT}
  maxBlurRadius={16}
  tintOpacityTop={0.3}
  tintOpacityMiddle={0.1}
  style={{ position: "absolute", top: 0, left: 0, right: 0 }}
>
  {/* Header content */}
</VariableHeaderBlurView>;
```

---

## ⚙️ Props

| Prop                | Type        | Description                                                  |
| ------------------- | ----------- | ------------------------------------------------------------ |
| `headerHeight`      | `number`    | Height of the blur header region.                            |
| `maxBlurRadius`     | `number`    | Maximum blur intensity (`15` iOS / `16` Android by default). |
| `tintOpacityTop`    | `number`    | Top tint opacity (`0.4` iOS / `0.3` Android defaults).       |
| `tintOpacityMiddle` | `number`    | Mid tint opacity (`0.1` default).                            |
| `tintColor`         | `string`    | Tint color (Android only currently).                         |
| `progressiveStartY` | `number`    | Progressive blur start Y position (Android only).            |
| `progressiveEndY`   | `number`    | Progressive blur end Y position (Android only).              |
| `style`             | `ViewStyle` | Standard React Native style prop.                            |
| `children`          | `ReactNode` | Content placed inside the header blur container.             |

---

## 🏗️ Architecture

- `src/VariableHeaderBlurView.tsx` exposes the native view manager.
- `ios/VariableHeaderBlurView.swift` hosts variable blur + tint gradient.
- `android/VariableHeaderBlurView.kt` hosts Haze progressive blur + tint gradient.
- Native props are mapped via `VariableHeaderBlurModule` on both platforms.

---

## 🙏 Credits

- iOS variable blur inspiration: [nikstar/VariableBlur](https://github.com/nikstar/VariableBlur)
- Android blur pipeline: [chrisbanes/haze](https://github.com/chrisbanes/haze)
