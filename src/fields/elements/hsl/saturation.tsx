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

    // Calcul de la position du curseur basé sur la saturation (0 à 100)
    const position = useMemo(() => {
      const x = (color.hsl.s / 100) * width;
      return { x };
    }, [color.hsl.s, width]);

    // Mise à jour de la saturation lors du déplacement du curseur
    const updateColor = useCallback(
      (x: number) => {
        const nextColor = new Color(
          {
            ...color.hsl,
            s: (x / width) * 100, // Mise à jour de la saturation en HSL
          },
          'hsl',
          hideAlpha,
        );

        onChange(nextColor);
      },
      [color.hsl, width, onChange],
    );

    // Couleur à 0% de saturation (désaturée)
    const desaturatedColor = colorblender({ ...color.hsl, s: 0 }).rgb();

    // Couleur à 100% de saturation (complètement saturée)
    const saturatedColor = colorblender({ ...color.hsl, s: 100 }).rgb();

    // Couleur du curseur actuelle
    const pointerColor = `rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`;

    // Dégradé de fond de la saturation de 0% à 100%
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
