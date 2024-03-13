import type { ModelComponents } from './types';
import type { Color } from './helpers/color';

import { useCallback, useState } from 'react';
import { ChevronDown } from './icons/chevron-down';
import { Copy } from './icons/copy';
import { Check } from './icons/check';
import { cn } from './helpers/utils';

interface ToolBarProps {
  modelComponents: ModelComponents;
  selectedModel: keyof ModelComponents;
  setSelectedModel: React.Dispatch<React.SetStateAction<keyof ModelComponents>>;
  color: Color;
  selectModels: boolean;
  setSelectModels: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToolBar = ({
  color,
  modelComponents,
  selectedModel,
  setSelectedModel,
  selectModels,
  setSelectModels,
}: ToolBarProps) => {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const toCopy = modelComponents[selectedModel].copy(color);
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [color, selectedModel]);

  return (
    <div className="colorblender-picker-bottom">
      <button
        onClick={() => setSelectModels((prev) => !prev)}
        className={cn('colorblender-picker-dropdown', selectModels && 'active')}
      >
        {selectedModel}{' '}
        <ChevronDown
          style={{
            transform: selectModels ? 'rotate(180deg)' : undefined,
          }}
        />
        <div
          className={cn(
            'colorblender-picker-dropdown-menu',
            selectModels && 'open',
          )}
        >
          {Object.keys(modelComponents).map(
            (model: keyof typeof modelComponents) => (
              <span
                key={model}
                role="button"
                className={cn(
                  'colorblender-picker-dropdown-menu-item',
                  selectedModel === model && 'active',
                )}
                onClick={() => {
                  setTimeout(() => {
                    setSelectModels(false);
                  }, 100);
                  setSelectedModel(model);
                }}
              >
                {model}
              </span>
            ),
          )}
        </div>
      </button>

      <div className="colorblender-picker-action-buttons">
        <button onClick={copy}>{copied ? <Check /> : <Copy />}</button>
        <div
          className="colorblender-picker-color-preview"
          style={{
            backgroundColor: color.hex,
          }}
        />
      </div>
    </div>
  );
};
