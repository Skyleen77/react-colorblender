import type { FieldsComponent } from '.';
import { useCallback } from 'react';
import { Input } from './ui/input';
import { Color } from '../helpers/color';

export const HexInput = ({
  color,
  fields,
  setFields,
  onChange,
  onInputFocus,
  onInputBlur,
}: FieldsComponent) => {
  const onInputChange = useCallback(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      let hex = value.toUpperCase();

      if (!value.startsWith('#')) {
        hex = '#' + value;
      }

      setFields((fields) => ({
        ...fields,
        hex: { ...fields['hex'], value: hex },
      }));

      onChange(new Color(hex, 'hex'));
    },
    [onChange],
  );

  return (
    <div className="colorblender-picker-hex">
      <div className="colorblender-picker-hex-input-wrapper">
        <div
          style={{
            background: color.hex,
          }}
          className="colorblender-picker-hex-input"
        />
        <Input
          id="hex"
          value={fields.hex.value}
          onChange={onInputChange()}
          onFocus={onInputFocus('hex')}
          onBlur={onInputBlur('hex')}
        />
      </div>
    </div>
  );
};
