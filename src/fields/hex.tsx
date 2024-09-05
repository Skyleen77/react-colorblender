import type { FieldsComponent } from '.';
import { useCallback } from 'react';
import { Input } from './ui/input';
import { Color } from '../helpers/color';
import { colorblender } from 'colorblender';

export const HexInput = ({
  fields,
  setFields,
  onChange,
  onInputFocus,
  onInputBlur,
  hideAlpha,
}: FieldsComponent) => {
  const setHex = useCallback(
    (value: string) => {
      let hex = value.toUpperCase();

      if (!value.startsWith('#')) {
        hex = '#' + value;
      }

      setFields((fields) => ({
        ...fields,
        hex: { ...fields['hex'], value: hex },
      }));

      onChange(new Color(hex, 'hex', hideAlpha), hex);
    },
    [onChange],
  );

  const onInputChange = useCallback(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setHex(value);
    },
    [setHex],
  );

  return (
    <div className="colorblender-picker-hex">
      <Input
        id="hex"
        value={fields.hex.value}
        onChange={onInputChange()}
        onFocus={() => onInputFocus('hex')}
        onBlur={() => {
          const hexValue = fields.hex.value;
          const color = colorblender(hexValue);

          setHex(hideAlpha ? color.alpha(1).hex() : color.hex());

          onInputBlur('hex');
        }}
      />
    </div>
  );
};
