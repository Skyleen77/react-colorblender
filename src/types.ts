import type { Color } from './helpers/color';

export interface ElementProps {
  readonly color: Color;
  readonly onChange: (color: Color) => void;
  withLabel?: boolean;
}

export const models = ['hex', 'rgb', 'hsv'] as const;
export const objectModels = ['rgb', 'hsv'] as const;
export type Models = (typeof models)[number];
export type ObjectModels = (typeof objectModels)[number];
