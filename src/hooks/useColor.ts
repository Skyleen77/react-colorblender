import { useEffect, useState } from 'react';
import { Color } from '../helpers/color';

export function useColor(
  initialColor: string,
): [Color, React.Dispatch<React.SetStateAction<Color>>] {
  const [color, setColor] = useState(
    new Color(initialColor.toUpperCase(), 'hex'),
  );

  useEffect(() => {
    setColor(new Color(initialColor.toUpperCase(), 'hex'));
  }, [initialColor]);

  return [color, setColor];
}

export function toColor(color: string): Color {
  return new Color(color.toUpperCase(), 'hex');
}
