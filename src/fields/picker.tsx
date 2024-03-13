import type { ModelComponentProps } from '../types';

import { Alpha } from './elements/alpha';
import { Fields } from '.';
import { Hue } from './elements/hue';
import { HexInput } from './hex';
import { Saturation } from './elements/saturation';

export const Picker = ({
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

        <section>
          <Fields
            hideAlpha={hideAlpha}
            color={color}
            onChange={onChange}
            Component={HexInput}
          />
        </section>
      </div>
    </>
  );
};
