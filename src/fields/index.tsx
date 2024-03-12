import type { AnyColor, HexColor, HsvaColor, RgbaColor } from 'colorblender';

import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Color } from '../helpers/color';

interface FieldsProps {
  readonly hideAlpha: boolean;
  readonly height?: number;
  readonly color: Color;
  readonly onChange: (color: Color) => void;
  Component: FC<FieldsComponent>;
}

type FieldType = 'hex' | 'rgb' | 'hsv';
interface FieldValue {
  value: AnyColor;
  inputted: boolean;
}

interface Field extends Record<FieldType, FieldValue> {
  hex: {
    value: HexColor;
    inputted: boolean;
  };
  rgb: {
    value: RgbaColor;
    inputted: boolean;
  };
  hsv: {
    value: HsvaColor;
    inputted: boolean;
  };
}

export interface FieldsComponent {
  color: Color;
  fields: Field;
  setFields: React.Dispatch<React.SetStateAction<Field>>;
  onChange: (color: Color) => void;
  onInputFocus: (field: FieldType) => () => void;
  onInputBlur: (field: FieldType) => () => void;
  hideAlpha?: boolean;
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
        inputted: false,
      },
      hsv: {
        value: color.hsv,
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
      if (!fields.rgb.inputted) {
        setFields((fields) => ({
          ...fields,
          rgb: { ...fields.rgb, value: color.rgb },
        }));
      }
    }, [fields.rgb.inputted, color]);

    useEffect(() => {
      if (!fields.hsv.inputted) {
        setFields((fields) => ({
          ...fields,
          hsv: { ...fields.hsv, value: color.hsv },
        }));
      }
    }, [fields.hsv.inputted, color]);

    const onInputFocus = useCallback(
      <T extends keyof typeof fields>(field: T) =>
        () => {
          setFields((fields) => ({
            ...fields,
            [field]: { ...fields[field], inputted: true },
          }));
        },
      [],
    );

    const onInputBlur = useCallback(
      <T extends keyof typeof fields>(field: T) =>
        () => {
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
