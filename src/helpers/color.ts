import type { HexColor, HsvaColor, RgbaColor } from 'colorblender';
import { colorblender } from 'colorblender';
import { round, roundColor } from './utils';
import { Models, models } from '../types';

type ColorType = HexColor | RgbaColor | HsvaColor;

export class Color {
  public hex: HexColor;
  public rgb: RgbaColor;
  public rgbString: string;
  public hsv: HsvaColor;
  public hsvString: string;

  constructor(color: ColorType, model: Models) {
    const instance = colorblender(color);

    if (typeof color === 'string') {
      this[model] = color as any;
    } else if (color.a !== undefined) {
      const { a, ...colorWithoutAlpha } = color;
      this[model] = { ...roundColor(colorWithoutAlpha), a: round(a, 2) } as any;
    } else {
      this[model] = roundColor(color) as any;
    }

    if (model !== 'hex') {
      this[`${model}String`] = instance[`${model}String`]() as any;
    }

    for (const otherModel of models) {
      if (otherModel !== model) {
        this[otherModel] = instance[otherModel]() as any;
        if (otherModel !== 'hex') {
          this[`${otherModel}String`] = instance[
            `${otherModel}String`
          ]() as any;
        }
      }
    }
  }
}
