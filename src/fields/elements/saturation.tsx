import { memo, useCallback, useMemo } from 'react';
import { useBoundingClientRect } from '../../hooks/useBoundingClientRect';
import { Interactive } from './interactive';
import { Color } from '../../helpers/color';
import { limitValue } from '../../helpers/utils';

interface SaturationProps {
  height: number;
  color: Color;
  onChange: (color: Color) => void;
  hideAlpha: boolean;
}

export const Saturation = memo(
  ({ height, color, onChange, hideAlpha }: SaturationProps) => {
    const [saturationRef, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (limitValue(color.hsv.s, 0, 100) / 100) * width;
      const y = ((100 - limitValue(color.hsv.v, 0, 100)) / 100) * height;

      return { x, y };
    }, [color.hsv.s, color.hsv.v, width, height]);

    const updateColor = useCallback(
      (x: number, y: number) => {
        const nextColor = new Color(
          {
            ...color.hsv,
            s: (x / width) * 100,
            v: 100 - (y / height) * 100,
          },
          'hsv',
          hideAlpha,
        );

        onChange(nextColor);
      },
      [color.hsv, width, height, onChange],
    );

    const hsl = useMemo(
      () => [color.hsv.h, '100%', '50%'].join(' '),
      [color.hsv.h],
    );
    const rgb = useMemo(
      () => [color.rgb.r, color.rgb.g, color.rgb.b].join(' '),
      [color.rgb],
    );

    return (
      <Interactive onCoordinateChange={updateColor}>
        <div
          ref={saturationRef}
          style={{ height, backgroundColor: `hsl(${hsl})` }}
          className="colorblender-picker-saturation"
        >
          <div
            style={{
              left: position.x,
              top: position.y,
              backgroundColor: `rgb(${rgb})`,
            }}
            className="colorblender-picker-pointer"
          />
        </div>
      </Interactive>
    );
  },
);
