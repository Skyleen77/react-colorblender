import type { ElementProps } from '../../../types';

import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { colorblender } from 'colorblender';
import { WithLabel } from '../with-label';
import { Slider } from '../../ui/slider';

export const Saturation = memo(
  ({ color, onChange, hideAlpha, withLabel }: ElementProps) => {
    const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.hsv.s / 100) * width;
      return { x };
    }, [color.hsv.s, width]);

    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.hsv,
            s: (x / width) * 100,
          },
          'hsv',
          hideAlpha,
        );

        onChange(nextColor);
      },
      [color.hsv, width, onChange],
    );

    const saturatedColor = colorblender({ ...color.hsv, s: 100 }).rgb();
    const desaturatedColor = colorblender({ ...color.hsv, s: 0 }).rgb();
    const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
    const backgroundColor = `linear-gradient(
      to right,
      rgb(${desaturatedColor.r}, ${desaturatedColor.g}, ${desaturatedColor.b}),
      rgb(${saturatedColor.r}, ${saturatedColor.g}, ${saturatedColor.b})
    )`;

    return (
      <WithLabel label="Saturation" hide={!withLabel}>
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
