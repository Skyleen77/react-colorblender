import type { ElementProps } from '../../../types';

import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { WithLabel } from '../with-label';
import { Slider } from '../../ui/slider';

export const Green = memo(
  ({ color, onChange, hideAlpha, withLabel }: ElementProps) => {
    const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.rgb.g / 255) * width;

      return { x };
    }, [color.rgb.g, width]);

    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.rgb,
            g: (x / width) * 255,
          },
          'rgb',
          hideAlpha,
        );

        onChange(nextColor);
      },
      [color.rgb, width, onChange],
    );

    const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    const backgroundColor = `linear-gradient(
    to right,
    rgb(${color.rgb.r}, 0, ${color.rgb.b}),
    rgb(${color.rgb.r}, 255, ${color.rgb.b})
  )`;

    return (
      <WithLabel label="Green" hide={!withLabel}>
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
