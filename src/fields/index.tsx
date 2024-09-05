import type { AnyColor, HexColor, HsvaColor, RgbaColor } from 'colorblender';
import type { Color } from '../helpers/color';

import { FC, memo, useCallback, useEffect, useState } from 'react';

interface FieldsProps {
  hideAlpha: boolean;
  height?: number;
  color: Color;
  onChange: (color: Color) => void;
  Component: FC<FieldsComponent>;
}

type FieldType = 'hex' | 'rgb' | 'hsv';
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
  };
  hsv: {
    value: HsvaColor;
  };
}

export interface FieldsComponent {
  color: Color;
  fields: Field;
  setFields: React.Dispatch<React.SetStateAction<Field>>;
  onChange: (color: Color, internalHex: string) => void;
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
      },
      hsv: {
        value: color.hsv,
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
