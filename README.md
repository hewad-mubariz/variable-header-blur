# Variable Header Blur (Expo Module)

A native iOS variable blur header for Expo apps, powered by SwiftUI and `UIVisualEffectView`.

This module provides a **progressive blur effect** (top blurred → bottom clear) similar to iOS system headers, with smooth gradient transitions and optional tint overlays.

---

## ✨ Features

- Native iOS **variable blur** (not a simple Gaussian blur)
- Smooth gradient blur transition (top → bottom)
- Works with **Expo + React Native**
- Customizable:
  - `maxBlurRadius`
  - `tintOpacityTop`
  - `tintOpacityMiddle`

- Built using **SwiftUI + UIKit bridging**

---

## 📸 Preview

> A floating header blur over scrollable content

https://github.com/user-attachments/assets/25d221f3-ccb7-4dfd-a80a-f30a3dbd869c

---

## 🧠 How it works

This module is based on the original implementation from:

👉 [https://github.com/nikstar/VariableBlur](https://github.com/nikstar/VariableBlur)

The blur is achieved using:

- `UIVisualEffectView`
- Private Core Animation filters (`variableBlur`)
- A **gradient mask image** that controls blur intensity per pixel

### Important

The blur is applied at the **native layer level**, meaning:

- It blurs **everything behind it**
- It does **not blur its children**
- It must be used as a **background layer**, not a container

Correct usage:

```tsx
<View style={styles.header}>
  <VariableHeaderBlurView style={StyleSheet.absoluteFill} />

  <View>{/* Your content here */}</View>
</View>
```

---

## ⚠️ Important Notes

### 1. Not supported in Expo Go

This module contains **custom native iOS code**, so it will NOT work in Expo Go.

You must create a development build:

```bash
npx expo prebuild
npx expo run:ios
```

or:

```bash
npx expo start --dev-client
```

---

### 2. iOS Only

This module is currently:

- ✅ iOS supported
- ❌ Android not supported

---

### 3. Uses private API

The original implementation uses an **obfuscated private API** (`variableBlur` filter).

While it has been used in production without rejection, **use at your own risk**.

---

## 🚀 Installation

### 1. Add the module

Place the module inside your project:

```
modules/variable-header-blur
```

### 2. Install dependencies

```bash
npm install
```

### 3. Generate native code

```bash
npx expo prebuild
cd ios && pod install
```

---

## 🧩 Usage

```tsx
import { VariableHeaderBlurView } from "variable-header-blur";

<View style={{ flex: 1 }}>
  <ScrollView>{/* content */}</ScrollView>

  <View style={{ position: "absolute", top: 0, left: 0, right: 0 }}>
    <VariableHeaderBlurView
      style={StyleSheet.absoluteFill}
      maxBlurRadius={20}
      tintOpacityTop={0.4}
      tintOpacityMiddle={0.1}
    />

    <View style={{ padding: 16 }}>
      <Text>Header Content</Text>
    </View>
  </View>
</View>;
```

---

## ⚙️ Props

| Prop                | Type   | Default | Description                |
| ------------------- | ------ | ------- | -------------------------- |
| `maxBlurRadius`     | number | 15      | Maximum blur strength      |
| `tintOpacityTop`    | number | 0.4     | Opacity at top of gradient |
| `tintOpacityMiddle` | number | 0.1     | Opacity in middle          |

---

## 🏗️ Architecture

This module uses a **layered native structure**:

- `blurLayer` → SwiftUI + VariableBlur
- `contentLayer` → React Native children

This ensures:

- blur affects background only
- UI elements remain sharp

---

## 📦 Tech Stack

- Expo Modules API
- SwiftUI
- UIKit (`UIVisualEffectView`)
- Core Image (`CIFilter`)
- React Native

---

## 🙏 Credits

Huge credit to the original implementation:

👉 [https://github.com/nikstar/VariableBlur](https://github.com/nikstar/VariableBlur)

This module adapts it for Expo and React Native.

If you want, I can also:

- add a GIF demo section
- add Android fallback (simple blur)
- or prepare this for npm publishing 🚀
