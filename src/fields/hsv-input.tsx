import type { FieldsComponent } from '.';
import { useCallback, useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Color } from '../helpers/color';
import { colorblender, HsvaColor } from 'colorblender';
import { convertStringColorToArray } from '../helpers/utils';

const hsvStringToObject = (hsvString: string): HsvaColor => {
  const hsv = convertStringColorToArray(hsvString);
  console.log('convertStringColorToArray', hsv);

  return {
    h: hsv[0],
    s: hsv[1],
    v: hsv[2],
    a: hsv[3] ?? 1,
  };
};

export const HsvInputText = ({
  fields,
  setFields,
  onChange,
  onInputFocus,
  onInputBlur,
  hideAlpha,
}: FieldsComponent) => {
  const [internalHsv, setInternalHsv] = useState<string>(fields.hsv.inputValue);
  const [isFocused, setIsFocused] = useState(false);

  const setHsv = useCallback(
    (hsv: HsvaColor, hsvString: string) => {
      setFields((fields) => ({
        ...fields,
        hsv: { ...fields['hsv'], value: hsv, inputValue: hsvString },
      }));

      onChange(new Color(hsv, 'hsv', hideAlpha));
    },
    [onChange],
  );

  const onInputChange = useCallback(
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInternalHsv(value);
      const color = colorblender(hsvStringToObject(value));
      setHsv(color.hsv(), color.hsvString());
    },
    [setHsv],
  );

  useEffect(() => {
    if (!isFocused) setInternalHsv(fields.hsv.inputValue);
  }, [fields, isFocused]);

  return (
    <div className="colorblender-picker-input-text colorblender-picker-input-hsv">
      <Input
        id="hsv"
        value={internalHsv}
        onChange={onInputChange()}
        onFocus={() => {
          onInputFocus('hsv');
          setIsFocused(true);
        }}
        onBlur={() => {
          const hsvValue = fields.hsv.inputValue;
          const hsvObject = hsvStringToObject(hsvValue);

          if (hsvObject.h < 0) hsvObject.h = 0;
          if (hsvObject.h > 360) hsvObject.h = 360;
          if (hsvObject.s < 0) hsvObject.s = 0;
          if (hsvObject.s > 100) hsvObject.s = 100;
          if (hsvObject.v < 0) hsvObject.v = 0;
          if (hsvObject.v > 100) hsvObject.v = 100;

          const color = colorblender(hsvObject);

          setHsv(
            hideAlpha ? color.alpha(1).hsv() : color.hsv(),
            color.hsvString(),
          );
          setInternalHsv(color.hsvString());

          onInputBlur('hsv');
          setIsFocused(false);
        }}
      />
    </div>
  );
};
