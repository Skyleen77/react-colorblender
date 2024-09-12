import type {
  AnyColor,
  HexColor,
  HslaColor,
  HsvaColor,
  RgbaColor,
} from 'colorblender';
import type { Color } from '../helpers/color';

import { FC, memo, useCallback, useEffect, useState } from 'react';

interface FieldsProps {
  hideAlpha: boolean;
  height?: number;
  color: Color;
  onChange: (color: Color) => void;
  Component: FC<FieldsComponent>;
}

type FieldType = 'hex' | 'rgb' | 'hsv' | 'hsl';
interface FieldValue {
  value: AnyColor;
  inputted?: boolean;
}

interface Field extends Record<FieldType, FieldValue> {
  hex: {
    value: HexColor;
    inputted: boolean;
  };
  rgb: {
    value: RgbaColor;
    inputValue: string;
    inputted: boolean;
  };
  hsv: {
    value: HsvaColor;
    inputValue: string;
    inputted: boolean;
  };
  hsl: {
    value: HslaColor;
    inputValue: string;
    inputted: boolean;
  };
}

export interface FieldsComponent {
  color: Color;
  fields: Field;
  setFields: React.Dispatch<React.SetStateAction<Field>>;
  onChange: (color: Color, internalHex?: string) => void;
  onInputFocus: (field: FieldType) => void;
  onInputBlur: (field: FieldType) => void;
  hideAlpha: boolean;
}

export const Fields = memo(
  ({ hideAlpha, color, onChange, Component }: FieldsProps) => {
    const [fields, setFields] = useState({
      hex: {
        value: color.hex,
        inputted: false,
      },
      rgb: {
        value: color.rgb,
        inputValue: color.rgbString,
        inputted: false,
      },
      hsv: {
        value: color.hsv,
        inputValue: color.hsvString,
        inputted: false,
      },
      hsl: {
        value: color.hsl,
        inputValue: color.hslString,
        inputted: false,
      },
    });

    useEffect(() => {
      if (!fields.hex.inputted) {
        setFields((fields) => ({
          ...fields,
          hex: { ...fields.hex, value: color.hex },
        }));
      }
    }, [fields.hex.inputted, color]);

    useEffect(() => {
      if (!fields.hsv.inputted) {
        setFields((fields) => ({
          ...fields,
          hsv: { ...fields.hsv, value: color.hsv, inputValue: color.hsvString },
        }));
      }
    }, [fields.hsv.inputted, color]);

    useEffect(() => {
      if (!fields.rgb.inputted) {
        setFields((fields) => ({
          ...fields,
          rgb: { ...fields.rgb, value: color.rgb, inputValue: color.rgbString },
        }));
      }
    }, [fields.rgb.inputted, color]);

    useEffect(() => {
      if (!fields.hsl.inputted) {
        setFields((fields) => ({
          ...fields,
          hsl: { ...fields.hsl, value: color.hsl, inputValue: color.hslString },
        }));
      }
    }, [fields.hsl.inputted, color]);

    const onInputFocus = useCallback(
      <T extends keyof typeof fields>(field: T) => {
        setFields((fields) => ({
          ...fields,
          [field]: { ...fields[field], inputted: true },
        }));
      },
      [],
    );

    const onInputBlur = useCallback(
      <T extends keyof typeof fields>(field: T) => {
        setFields((fields) => ({
          ...fields,
          [field]: { ...fields[field], inputted: false },
        }));
      },
      [],
    );

    return (
      <Component
        color={color}
        fields={fields}
        setFields={setFields}
        onChange={onChange}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        hideAlpha={hideAlpha}
      />
    );
  },
);
