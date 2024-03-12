import * as React from 'react';

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  backgroundColor: string;
  pointerColor: string;
  position: { x: number };
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ backgroundColor, pointerColor, position, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="colorblender-picker-slider"
        style={{
          background: backgroundColor,
        }}
        {...props}
      >
        <div
          style={{ left: position.x, background: pointerColor }}
          className="colorblender-picker-pointer"
        />
      </div>
    );
  },
);
Slider.displayName = 'Slider';

export { Slider };
