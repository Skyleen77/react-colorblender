import type { ModelComponentProps } from '../types';
import type { FieldsComponent } from '.';
import { Fields } from '.';
import { Alpha } from './elements/alpha';
import { Red } from './elements/rgb/red';
import { Green } from './elements/rgb/green';
import { Blue } from './elements/rgb/blue';

const RgbInput = ({ color, onChange, hideAlpha }: FieldsComponent) => {
  return (
    <div className="colorblender-picker-body">
      <Red color={color} onChange={onChange} hideAlpha={hideAlpha} withLabel />
      <Green
        color={color}
        onChange={onChange}
        hideAlpha={hideAlpha}
        withLabel
      />
      <Blue color={color} onChange={onChange} hideAlpha={hideAlpha} withLabel />
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

export const Rgb = ({ hideAlpha, color, onChange }: ModelComponentProps) => (
  <section>
    <Fields
      hideAlpha={hideAlpha}
      color={color}
      onChange={onChange}
      Component={RgbInput}
    />
  </section>
);
