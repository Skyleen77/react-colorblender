import type { FieldsComponent } from '.';
import { useCallback, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Color } from '../helpers/color';
import { colorblender, HslaColor } from 'colorblender';
import { convertStringColorToArray } from '../helpers/utils';

const hslStringToObject = (hslString: string): HslaColor => {
  const hsl = convertStringColorToArray(hslString);

  return {
    h: hsl[0],
    s: hsl[1],
    l: hsl[2],
    a: hsl[3] ?? 1,
  };
};

export const HslInputText = ({
  fields,
  setFields,
  onChange,
  onInputFocus,
  onInputBlur,
  hideAlpha,
}: FieldsComponent) => {
  const [internalHsl, setInternalHsl] = useState<string>(fields.hsl.inputValue);
  const [isFocused, setIsFocused] = useState(false);

  const setHsl = useCallback(
    (hsl: HslaColor, hslString: string) => {
      setFields((fields) => ({
        ...fields,
        hsl: { ...fields['hsl'], value: hsl, inputValue: hslString },
      }));

      onChange(new Color(hsl, 'hsl', hideAlpha));
    },
    [onChange],
  );

  const onInputChange = useCallback(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInternalHsl(value);
      const color = colorblender(hslStringToObject(value));
      setHsl(color.hsl(), color.hslString());
    },
    [setHsl],
  );

  useEffect(() => {
    if (!isFocused) setInternalHsl(fields.hsl.inputValue);
  }, [fields, isFocused]);

  return (
    <div className="colorblender-picker-input-text colorblender-picker-input-hsl">
      <Input
        id="hsl"
        value={internalHsl}
        onChange={onInputChange()}
        onFocus={() => {
          onInputFocus('hsl');
          setIsFocused(true);
        }}
        onBlur={() => {
          const hslValue = fields.hsl.inputValue;
          const hslObject = hslStringToObject(hslValue);

          if (hslObject.h < 0) hslObject.h = 0;
          if (hslObject.h > 360) hslObject.h = 360;
          if (hslObject.s < 0) hslObject.s = 0;
          if (hslObject.s > 100) hslObject.s = 100;
          if (hslObject.l < 0) hslObject.l = 0;
          if (hslObject.l > 100) hslObject.l = 100;

          const color = colorblender(hslObject);

          setHsl(
            hideAlpha ? color.alpha(1).hsl() : color.hsl(),
            color.hslString(),
          );
          setInternalHsl(color.hslString());

          onInputBlur('hsl');
          setIsFocused(false);
        }}
      />
    </div>
  );
};
