import type { ElementProps } from '../../types';

import { useBoundingClientRect } from '../../hooks/useBoundingClientRect';
import { memo, useCallback, useMemo } from 'react';
import { Interactive } from './interactive';
import { Color } from '../../helpers/color';
import { WithLabel } from './with-label';
import { Slider } from '../ui/slider';

export const Alpha = memo(
  ({ color, onChange, withLabel, hideAlpha }: ElementProps) => {
    const [ref, { width }] = useBoundingClientRect<HTMLDivElement>();

    const position = useMemo(() => {
      const x = color.hsv.a * width;

      return { x };
    }, [color.hsv.a, width]);

    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.hsv,
            a: x / width,
          },
          'hsv',
          hideAlpha,
        );

        onChange(nextColor);
      },
      [color.hsv, width, onChange],
    );

    const rgb = useMemo(
      () => [color.rgb.r, color.rgb.g, color.rgb.b].join(' '),
      [color.rgb.r, color.rgb.g, color.rgb.b],
    );
    const rgba = useMemo(
      () => [rgb, color.rgb.a].join(' / '),
      [rgb, color.rgb.a],
    );
    const pointerColor = `linear-gradient(to right, rgb(${rgba}), rgb(${rgba})) top left / auto auto,
  conic-gradient(#9ca3af 0.25turn, #d1d5db 0.25turn 0.5turn, #9ca3af 0.5turn 0.75turn, #d1d5db 0.75turn) ${
    -position.x - 4
  }px 2px / 12px 12px
  repeat`;
    const backgroundColor = `linear-gradient(to right, rgb(${rgb} / 0), rgb(${rgb} / 1)) top left / auto auto,
  conic-gradient(#9ca3af 0.25turn, #d1d5db 0.25turn 0.5turn, #9ca3af 0.5turn 0.75turn, #d1d5db 0.75turn) top left / 12px 12px
  repeat`;

    return (
      <WithLabel label="Alpha" hide={!withLabel}>
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
