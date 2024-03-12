<div align="center">
  <p></p>
  <img src="./logo.png" width="300" />
  <p></p>
  <h1>React Colorblender</h1>

  <p>A powerful color picker in react.</p>

  <img src="https://cdn.sanity.io/images/k65uhcn4/production/cc585b55855e60bac91834431fd607f14973ef6c-590x700.gif" width="500" />
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

| Property  | Required | Description                  | Type                   | Default |
| --------- | -------- | ---------------------------- | ---------------------- | ------- |
| color     | true     | The color value              | Color                  | -       |
| onChange  | true     | The color change event       | (color: Color) => void | -       |
| width     | false    | The width of the picker      | number                 | 250     |
| className | false    | The class name of the picker | string                 | -       |
| hideInput | false    | Hide the input fields        | boolean                | false   |
| hideAlpha | false    | Hide the alpha slider        | boolean                | false   |

### useColor

```typescript
const [color, setColor] = useColor('#ff0000');
```

| Property | Description | Type                   |
| -------- | ----------- | ---------------------- |
| color    | The color   | Color                  |
| setColor | The setter  | (color: Color) => void |

### ColorPickerProps

```typescript
interface ColorPickerProps {
  readonly width?: number;
  readonly hideAlpha?: boolean;
  readonly hideInput?: boolean;
  readonly color: Color;
  readonly onChange: (color: Color) => void;
  readonly className?: string;
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

## Issues

Please file an issue for bugs, missing documentation, or unexpected behavior.

[File an issue](https://github.com/Skyleen77/react-colorblender/issues)

## LICENSE

MIT
