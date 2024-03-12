import { Alpha } from './elements/alpha';
import { ModelComponentProps } from '../color-picker';
import { Fields } from '.';
import { Hue } from './elements/hue';
import { Saturation } from './elements/saturation';
import { HexInput } from './hex';

export const Picker = ({
  height,
  hideAlpha,
  color,
  onChange,
}: ModelComponentProps) => {
  return (
    <>
      <div>
        <Saturation height={height} color={color} onChange={onChange} />
      </div>

      <div className="colorblender-picker-body">
        <Hue color={color} onChange={onChange} />

        {!hideAlpha && <Alpha color={color} onChange={onChange} />}

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
