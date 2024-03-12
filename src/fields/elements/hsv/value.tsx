import { memo, useCallback, useMemo } from 'react';
import { Color } from '../../../helpers/color';
import { useBoundingClientRect } from '../../../hooks/useBoundingClientRect';
import { Interactive } from '../interactive';
import { colorblender } from 'colorblender';
import { WithLabel } from '../with-label';
import { ElementProps } from '../../../types';
import { Slider } from '../../ui/slider';

export const Value = memo(({ color, onChange, withLabel }: ElementProps) => {
  const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

  const position = useMemo(() => {
    const x = (color.hsv.v / 100) * width;

    return { x };
  }, [color.hsv.v, width]);

  const updateColor = useCallback(
    (x: number) => {
      const nextColor = new Color(
        {
          ...color.hsv,
          v: (x / width) * 100,
        },
        'hsv',
      );

      onChange(nextColor);
    },
    [color.hsv, width, onChange],
  );

  const colorAtZeroValue = colorblender({ ...color.hsv, v: 0 }).rgb();
  const colorAtFullValue = colorblender({ ...color.hsv, v: 100 }).rgb();
  const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;
  const backgroundColor = `linear-gradient(
    to right,
    rgb(${colorAtZeroValue.r}, ${colorAtZeroValue.g}, ${colorAtZeroValue.b}),
    rgb(${colorAtFullValue.r}, ${colorAtFullValue.g}, ${colorAtFullValue.b})
  )`;

  return (
    <WithLabel label="Value" hide={!withLabel}>
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
