import type { FieldsComponent } from '.';
import { useCallback, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Color } from '../helpers/color';
import { colorblender, RgbaColor } from 'colorblender';
import { convertStringColorToArray } from '../helpers/utils';

const rgbStringToObject = (rgbString: string): RgbaColor => {
  const rgb = convertStringColorToArray(rgbString);

  return {
    r: rgb[0],
    g: rgb[1],
    b: rgb[2],
    a: rgb[3] ?? 1,
  };
};

export const RgbInputText = ({
  fields,
  setFields,
  onChange,
  onInputFocus,
  onInputBlur,
  hideAlpha,
}: FieldsComponent) => {
  const [internalRgb, setInternalRgb] = useState<string>(fields.rgb.inputValue);
  const [isFocused, setIsFocused] = useState(false);

  const setRgb = useCallback(
    (rgb: RgbaColor, rgbString: string) => {
      setFields((fields) => ({
        ...fields,
        rgb: { ...fields['rgb'], value: rgb, inputValue: rgbString },
      }));

      onChange(new Color(rgb, 'rgb', hideAlpha));
    },
    [onChange],
  );

  const onInputChange = useCallback(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInternalRgb(value);
      const color = colorblender(rgbStringToObject(value));
      setRgb(color.rgb(), color.rgbString());
    },
    [setRgb],
  );

  useEffect(() => {
    if (!isFocused) setInternalRgb(fields.rgb.inputValue);
  }, [fields, isFocused]);

  return (
    <div className="colorblender-picker-input-text colorblender-picker-input-rgb">
      <Input
        id="rgb"
        value={internalRgb}
        onChange={onInputChange()}
        onFocus={() => {
          onInputFocus('rgb');
          setIsFocused(true);
        }}
        onBlur={() => {
          const rgbValue = fields.rgb.inputValue;
          const rgbObject = rgbStringToObject(rgbValue);

          if (rgbObject.r < 0) rgbObject.r = 0;
          if (rgbObject.r > 255) rgbObject.r = 255;
          if (rgbObject.g < 0) rgbObject.g = 0;
          if (rgbObject.g > 255) rgbObject.g = 255;
          if (rgbObject.b < 0) rgbObject.b = 0;
          if (rgbObject.b > 255) rgbObject.b = 255;

          const color = colorblender(rgbObject);

          setRgb(
            hideAlpha ? color.alpha(1).rgb() : color.rgb(),
            color.rgbString(),
          );
          setInternalRgb(color.rgbString());

          onInputBlur('rgb');
          setIsFocused(false);
        }}
      />
    </div>
  );
};
