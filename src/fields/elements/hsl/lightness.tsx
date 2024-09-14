import type { ElementProps } from '../../../types';
import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { colorblender } from 'colorblender';
import { WithLabel } from '../with-label';
import { Slider } from '../../ui/slider';

export const Lightness = memo(
  ({ color, onChange, hideAlpha, withLabel }: ElementProps) => {
    const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = (color.hsl.l / 100) * width;
      return { x };
    }, [color.hsl.l, width]);

    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.hsl,
            l: (x / width) * 100,
          },
          'hsl',
          hideAlpha,
        );
        onChange(nextColor);
      },
      [color.hsl, width, onChange],
    );

    const colorAtZeroLightness = colorblender({ ...color.hsl, l: 0 }).rgb();
    const colorAtMiddleLightness = colorblender({ ...color.hsl, l: 50 }).rgb();
    const colorAtFullLightness = colorblender({ ...color.hsl, l: 100 }).rgb();

    const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;

    const backgroundColor = `linear-gradient(
      to right,
      rgb(${colorAtZeroLightness.r}, ${colorAtZeroLightness.g}, ${colorAtZeroLightness.b}),
      rgb(${colorAtMiddleLightness.r}, ${colorAtMiddleLightness.g}, ${colorAtMiddleLightness.b}),
      rgb(${colorAtFullLightness.r}, ${colorAtFullLightness.g}, ${colorAtFullLightness.b})
    )`;

    return (
      <WithLabel label="Lightness" hide={!withLabel}>
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
