import type { Color } from './helpers/color';
import type { ColorPickerProps, ModelComponents } from './types';

import { memo, useMemo, useState } from 'react';
import { Picker } from './fields/picker';
import { Hsv } from './fields/hsv';
import { Rgb } from './fields/rgb';
import { ToolBar } from './tool-bar';
import { cn } from './helpers/utils';

const modelComponents: ModelComponents = {
  'Picker': {
    component: Picker,
    copy: (color: Color) => color.hex,
  },
  'HSV': {
    component: Hsv,
    copy: (color: Color) => color.hsvString,
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
    color,
    onChange,
    className,
  }: ColorPickerProps) => {
    const [selectedModel, setSelectedModel] =
      useState<keyof typeof modelComponents>('Picker');
    const [selectModels, setSelectModels] = useState(false);
    const height = useMemo(() => width / 1.67, [width]);

    const renderModel = () => {
      const Component = modelComponents[selectedModel].component;

      return (
        <Component
          height={height}
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
