import { memo, useCallback, useMemo } from 'react';
import { useBoundingClientRect } from '../../hooks/useBoundingClientRect';
import { Interactive } from './interactive';
import { Color } from '../../helpers/color';
import { WithLabel } from './with-label';
import { ElementProps } from '../../types';
import { Slider } from '../ui/slider';

export const Hue = memo(
  ({ color, onChange, withLabel = false }: ElementProps) => {
    const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.hsv.h / 360) * width;

      return { x };
    }, [color.hsv.h, width]);

    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.hsv,
            h: (x / width) * 360,
          },
          'hsv',
        );

        onChange(nextColor);
      },
      [color.hsv, width, onChange],
    );

    const hsl = useMemo(
      () => [color.hsv.h, '100%', '50%'].join(' '),
      [color.hsv.h],
    );

    const pointerColor = `hsl(${hsl})`;
    const backgroundColor = `linear-gradient(
      to right,
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0)
    )`;

    return (
      <WithLabel label="Hue" hide={!withLabel}>
        <Interactive onCoordinateChange={updateColor}>
          <Slider
            ref={ref}
            position={position}
            backgroundColor={backgroundColor}
            pointerColor={pointerColor}
          />
        </Interactive>
      </WithLabel>
    );
  },
);
