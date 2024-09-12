import type { Color } from './helpers/color';
import type { ColorPickerProps, ModelComponents } from './types';

import { memo, useMemo } from 'react';
import { cn } from './helpers/utils';
import { FullPicker } from './fields/full-picker';

const modelComponents: ModelComponents = {
  'Picker': {
    component: FullPicker,
    copy: (color: Color) => color.hex,
  },
};

export const FullColorPicker = memo(
  ({
    width = 350,
    height,
    hideAlpha = false,
    color,
    onChange,
    className,
  }: ColorPickerProps) => {
    const internalHeight = useMemo(() => height ?? width / 1.67, [width]);

    return (
      <div
        className={cn('colorblender-picker', className)}
        style={{
          width: `${width}px`,
        }}
      >
        {Object.values(modelComponents).map(({ component: Component }) => {
          return (
            <Component
              height={internalHeight}
              width={width}
              hideAlpha={hideAlpha}
              color={color}
              onChange={onChange}
            />
          );
        })}
      </div>
    );
  },
);
