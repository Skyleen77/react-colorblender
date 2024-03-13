<div align="center">
  <p></p>
  <img src="./logo.png" width="300" />
  <p></p>
  <h1>React Colorblender</h1>

  <p>A powerful color picker in react.</p>

  <img src="./color-picker-preview.gif" width="500" />
</div>

## Installation

```bash
npm install react-colorblender
```

## Import

```typescript
import { ColorPicker } from 'react-colorblender';
```

## Usage

```tsx
import React from 'react';
import { ColorPicker, useColor } from 'react-colorblender';

import 'react-colorblender/dist/style.css';

export default function Home() {
  const [color, setColor] = useColor('#ff0000');

  return <ColorPicker color={color} onChange={setColor} />;
}
```

## API

### ColorPicker

```tsx
<ColorPicker color={color} onChange={setColor} />
```

| Property  | Required | Description                  | Type                   | Default |
| --------- | -------- | ---------------------------- | ---------------------- | ------- |
| color     | true     | The color value              | Color                  | -       |
| onChange  | true     | The color change event       | (color: Color) => void | -       |
| width     | false    | The width of the picker      | number                 | 250     |
| className | false    | The class name of the picker | string                 | -       |
| hideAlpha | false    | Hide the alpha slider        | boolean                | false   |

### useColor

```typescript
const [color, setColor] = useColor('#ff0000');
```

| Args         | Description       | Type            |
| ------------ | ----------------- | --------------- |
| initialColor | The initial color | [Color](#color) |

### ColorPickerProps

```typescript
interface ColorPickerProps {
  width?: number;
  hideAlpha?: boolean;
  hideInput?: boolean;
  color: Color;
  onChange: (color: Color) => void;
  className?: string;
}
```

### Color

```typescript
import type { HexColor, HsvaColor, RgbaColor } from 'colorblender';

type ColorType = HexColor | RgbaColor | HsvaColor;

class Color {
  hex: HexColor;
  rgb: RgbaColor;
  rgbString: string;
  hsv: HsvaColor;
  hsvString: string;

  constructor(color: ColorType, model: Models);
}
```

### HexColor

```typescript
type HexColor = string;
```

### RgbaColor

```typescript
interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}
```

### HsvaColor

```typescript
interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}
```

## Roadmap

- [x] Picker with HEX
- [x] Alpha
- [x] RGB
- [x] HSV
- [ ] HSL
- [ ] HWB
- [ ] CMYK
- [ ] XYZ
- [ ] LAB
- [ ] LCH
- [x] Copy color
- [x] Custom css variables
- [ ] Pick color from page
- [ ] Multiple color models with useColor hook
- [ ] And more...

## Issues

Please file an issue for bugs, missing documentation, or unexpected behavior.

[File an issue](https://github.com/Skyleen77/react-colorblender/issues)

## LICENSE

MIT
