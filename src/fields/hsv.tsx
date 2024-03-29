import type { ModelComponentProps } from '../types';
import type { FieldsComponent } from '.';

import { Fields } from '.';
import { Saturation } from './elements/hsv/saturation';
import { Hue } from './elements/hue';
import { Alpha } from './elements/alpha';
import { Value } from './elements/hsv/value';

const HsvInput = ({ color, onChange, hideAlpha }: FieldsComponent) => {
  return (
    <div className="colorblender-picker-body">
      <Hue color={color} onChange={onChange} hideAlpha={hideAlpha} withLabel />
      <Saturation
        color={color}
        onChange={onChange}
        hideAlpha={hideAlpha}
        withLabel
      />
      <Value
        color={color}
        onChange={onChange}
        hideAlpha={hideAlpha}
        withLabel
      />
      {!hideAlpha && (
        <Alpha
          color={color}
          onChange={onChange}
          hideAlpha={hideAlpha}
          withLabel
        />
      )}
    </div>
  );
};

export const Hsv = ({ hideAlpha, color, onChange }: ModelComponentProps) => (
  <section>
    <Fields
      hideAlpha={hideAlpha}
      color={color}
      onChange={onChange}
      Component={HsvInput}
    />
  </section>
);
