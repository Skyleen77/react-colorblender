import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { WithLabel } from '../with-label';
import { ElementProps } from '../../../types';
import { Slider } from '../../ui/slider';

export const Red = memo(({ color, onChange, withLabel }: ElementProps) => {
  const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

  const position = useMemo(() => {
    const x = (color.rgb.r / 255) * width;

    return { x };
  }, [color.rgb.r, width]);

  const updateColor = useCallback(
    (x: number) => {
      const nextColor = new Color(
        {
          ...color.rgb,
          r: (x / width) * 255,
        },
        'rgb',
      );

      onChange(nextColor);
    },
    [color.rgb, width, onChange],
  );

  const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const backgroundColor = `linear-gradient(
    to right,
    rgb(0, ${color.rgb.g}, ${color.rgb.b}),
    rgb(255, ${color.rgb.g}, ${color.rgb.b})
  )`;

  return (
    <WithLabel label="Red" hide={!withLabel}>
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
});
