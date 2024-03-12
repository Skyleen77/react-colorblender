import { memo, useCallback, useMemo, useState } from 'react';
import { Color } from './helpers/color';
import { ChevronDown } from './icons/chevron-down';
import { Copy } from './icons/copy';
import { cn } from './helpers/utils';
import { Picker } from './fields/picker';
import { Check } from './icons/check';
import { Hsv } from './fields/hsv';
import { Rgb } from './fields/rgb';

export interface ColorPickerProps {
  readonly width?: number;
  readonly hideAlpha?: boolean;
  readonly hideInput?: boolean;
  readonly color: Color;
  readonly onChange: (color: Color) => void;
  readonly className?: string;
}

export type ModelComponentProps = Omit<
  Required<ColorPickerProps>,
  'className' | 'hideInput'
> & {
  readonly height: number;
};

const modelComponents = {
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
    hideInput = false,
    color,
    onChange,
    className,
  }: ColorPickerProps) => {
    const [selectedModel, setSelectedModel] =
      useState<keyof typeof modelComponents>('Picker');
    const [selectModels, setSelectModels] = useState(false);
    const [copied, setCopied] = useState(false);
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

    const copy = useCallback(() => {
      const toCopy = modelComponents[selectedModel].copy(color);
      navigator.clipboard.writeText(toCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, [color, selectedModel]);

    return (
      <div
        id="colorblender-picker"
        className={className}
        style={{
          width: `${width}px`,
        }}
      >
        {renderModel()}

        {!hideInput && (
          <>
            {selectModels && (
              <div className="colorblender-picker-selector-models-wrapper">
                <div className="colorblender-picker-selector-models">
                  {Object.keys(modelComponents).map(
                    (model: keyof typeof modelComponents) => (
                      <button
                        key={model}
                        className={cn(
                          'colorblender-picker-selector-model',
                          selectedModel === model && 'active',
                        )}
                        onClick={() => {
                          setSelectedModel(model);
                          setSelectModels(false);
                        }}
                      >
                        {model}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
            <div className="colorblender-picker-bottom">
              <div className="colorblender-picker-action-buttons">
                <button onClick={copy}>{copied ? <Check /> : <Copy />}</button>
              </div>

              <button
                onClick={() => setSelectModels((prev) => !prev)}
                className={cn(
                  'colorblender-picker-selector',
                  selectModels && 'active',
                )}
              >
                {selectedModel}{' '}
                <ChevronDown
                  style={{
                    transform: selectModels ? 'rotate(180deg)' : undefined,
                  }}
                />
              </button>
            </div>
          </>
        )}
      </div>
    );
  },
);
