import type { Color } from './helpers/color';

export interface ElementProps {
  color: Color;
  onChange: (color: Color, initialColor?: string) => void;
  hideAlpha: boolean;
  withLabel?: boolean;
}

export const models = ['hex', 'rgb', 'hsv', 'hsl'] as const;
export const objectModels = ['rgb', 'hsv', 'hsl'] as const;
export type Models = (typeof models)[number];
export type ObjectModels = (typeof objectModels)[number];

export interface ColorPickerProps {
  width?: number;
  height?: number;
  hideAlpha?: boolean;
  color: Color;
  onChange: (color: Color, initialColor?: string) => void;
  className?: string;
}

export type ModelComponentProps = Omit<
  Required<ColorPickerProps>,
  'className' | 'hideInput' | 'theme'
> & {
  height: number;
};

export type ModelComponents = Record<
  string,
  {
    component: React.FC<ModelComponentProps>;
    copy: (color: Color) => string;
  }
>;
