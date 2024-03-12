import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { WithLabel } from '../with-label';
import { ElementProps } from '../../../types';
import { Slider } from '../../ui/slider';

export const Blue = memo(({ color, onChange, withLabel }: ElementProps) => {
  const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

  const position = useMemo(() => {
    const x = (color.rgb.b / 255) * width;

    return { x };
  }, [color.rgb.b, width]);

  const updateColor = useCallback(
    (x: number) => {
      const nextColor = new Color(
        {
          ...color.rgb,
          b: (x / width) * 255,
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
    rgb(${color.rgb.r}, ${color.rgb.g}, 0),
    rgb(${color.rgb.r}, ${color.rgb.g}, 255)
  )`;

  return (
    <WithLabel label="Blue" hide={!withLabel}>
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
