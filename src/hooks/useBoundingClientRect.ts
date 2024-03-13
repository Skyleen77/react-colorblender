import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

interface Position {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export function useBoundingClientRect<T extends HTMLElement>(): [
  React.RefObject<T>,
  Size,
  () => Position,
] {
  const ref = useRef<T>(null);

  const [resizeCounter, setResizeCounter] = useState(0);

  const onResize = useCallback(
    () => setResizeCounter((resizeCounter) => resizeCounter + 1),
    [],
  );

  useLayoutEffect(() => {
    window.addEventListener('resize', onResize, false);

    const observer = new ResizeObserver(onResize);

    if (ref.current) observer.observe(ref.current);

    return () => {
      window.removeEventListener('resize', onResize, false);
      observer.disconnect();
    };
  }, [onResize]);

  const size = useMemo(() => {
    const { width = 1, height = 1 } =
      ref.current?.getBoundingClientRect() ?? ({} as DOMRect);

    return { width, height };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resizeCounter]);

  const getPosition = useCallback(() => {
    const {
      left = 1,
      right = 1,
      top = 1,
      bottom = 1,
    } = ref.current?.getBoundingClientRect() ?? ({} as DOMRect);

    return { left, right, top, bottom };
  }, []);

  return [ref, size, getPosition];
}
