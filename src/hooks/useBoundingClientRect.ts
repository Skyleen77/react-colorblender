import { useLayoutEffect, useRef, useState } from 'react';

interface Size {
  readonly width: number;
  readonly height: number;
}

interface Position {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
}

export function useBoundingClientRect<T extends HTMLElement>(): [
  React.RefObject<T>,
  Size,
  () => Position,
] {
  const ref = useRef<T>(null);

  const [_, setResizeCounter] = useState(0);

  const onResize = () => setResizeCounter((resizeCounter) => resizeCounter + 1);

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize, false);

    const observer = new ResizeObserver(onResize);

    if (ref.current) observer.observe(ref.current);

    return () => {
      window.removeEventListener('resize', onResize, false);
      observer.disconnect();
    };
  }, [onResize]);

  const size = ref.current?.getBoundingClientRect() ?? { width: 1, height: 1 };

  const getPosition = () => {
    const {
      left = 1,
      right = 1,
      top = 1,
      bottom = 1,
    } = ref.current?.getBoundingClientRect() ?? ({} as DOMRect);

    return { left, right, top, bottom };
  };

  return [ref, size, getPosition];
}
