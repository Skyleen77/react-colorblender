import type { Color } from './helpers/color';
import type { ColorPickerProps, ModelComponents } from './types';

import { memo, useMemo, useState } from 'react';
import { Picker } from './fields/picker';
import { Hsv } from './fields/hsv';
import { Rgb } from './fields/rgb';
import { ToolBar } from './tool-bar';
import { cn } from './helpers/utils';
import { Hsl } from './fields/hsl';
import { toColor } from './hooks/useColor';

const modelComponents: ModelComponents = {
  'Picker': {
    component: Picker,
    copy: (color: Color) => color.hex,
  },
  'HSV': {
    component: Hsv,
    copy: (color: Color) => color.hsvString,
  },
  'HSL': {
    component: Hsl,
    copy: (color: Color) => color.hslString,
  },
  'RGB': {
    component: Rgb,
    copy: (color: Color) => color.rgbString,
  },
};

export const ColorPicker = memo(
  ({
    width = 250,
    hideAlpha = false,
    palette,
    color,
    height,
    onChange,
    onClear,
    className,
  }: ColorPickerProps) => {
    const [selectedModel, setSelectedModel] =
      useState<keyof typeof modelComponents>('Picker');
    const [selectModels, setSelectModels] = useState(false);
    const internalHeight = useMemo(() => height ?? width / 1.67, [width]);

    const renderModel = () => {
      const Component = modelComponents[selectedModel].component;

      return (
        <Component
          height={internalHeight}
          width={width}
          hideAlpha={hideAlpha}
          color={color}
          onChange={onChange}
        />
      );
    };

    return (
      <div
        className={cn('colorblender-picker', className)}
        style={{
          width: `${width}px`,
        }}
      >
        {selectModels && (
          <div
            className="colorblender-picker-dropdown-overlay"
            onClick={() => setSelectModels(false)}
          />
        )}

        {renderModel()}

        {palette?.length && selectedModel === 'Picker' ? (
          <div className="colorblender-picker-palette">
            {onClear ? (
              <button
                className="colorblender-picker-palette-color colorblender-picker-palette-clear"
                onClick={onClear}
              >
                <span />
              </button>
            ) : null}

            {palette.map((color) => (
              <button
                key={color}
                className="colorblender-picker-palette-color"
                style={{ backgroundColor: color }}
                onClick={() => {
                  const newColor = toColor(color);
                  onChange(newColor, color);
                }}
              />
            ))}
          </div>
        ) : null}

        <ToolBar
          color={color}
          modelComponents={modelComponents}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectModels={selectModels}
          setSelectModels={setSelectModels}
        />
      </div>
    );
  },
);
