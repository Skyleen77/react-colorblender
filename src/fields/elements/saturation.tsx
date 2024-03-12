import { memo, useCallback, useMemo } from 'react';
import { useBoundingClientRect } from '../../hooks/useBoundingClientRect';
import { Interactive } from './interactive';
import { Color } from '../../helpers/color';

interface SaturationProps {
  readonly height: number;
  readonly color: Color;
  readonly onChange: (color: Color) => void;
}

export const Saturation = memo(
  ({ height, color, onChange }: SaturationProps) => {
    const [saturationRef, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.hsv.s / 100) * width;
      const y = ((100 - color.hsv.v) / 100) * height;

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
