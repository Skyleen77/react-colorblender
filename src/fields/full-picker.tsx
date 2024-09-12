import type { ModelComponentProps } from '../types';

import { Alpha } from './elements/alpha';
import { Fields } from '.';
import { Hue } from './elements/hue';
import { HexInput } from './hex';
import { Saturation } from './elements/saturation';
import { HsvInputText } from './hsv-input';
import { RgbInputText } from './rgb-input';
import { HslInputText } from './hsl-input';

export const FullPicker = ({
  hideAlpha,
  height,
  color,
  onChange,
}: ModelComponentProps) => {
  return (
    <>
      <Saturation
        height={height}
        color={color}
        onChange={onChange}
        hideAlpha={hideAlpha}
      />

      <div className="colorblender-picker-body">
        <Hue color={color} onChange={onChange} hideAlpha={hideAlpha} />

        {!hideAlpha && (
          <Alpha color={color} onChange={onChange} hideAlpha={hideAlpha} />
        )}

        <section className="colorblender-picker-full-picker-section">
          <div className="colorblender-picker-full-picker-item">
            <Fields
              hideAlpha={hideAlpha}
              color={color}
              onChange={onChange}
              Component={HexInput}
            />

            <Fields
              hideAlpha={hideAlpha}
              color={color}
              onChange={onChange}
              Component={RgbInputText}
            />
          </div>

          <div className="colorblender-picker-full-picker-item">
            <Fields
              hideAlpha={hideAlpha}
              color={color}
              onChange={onChange}
              Component={HsvInputText}
            />

            <Fields
              hideAlpha={hideAlpha}
              color={color}
              onChange={onChange}
              Component={HslInputText}
            />
          </div>
        </section>
      </div>
    </>
  );
};
