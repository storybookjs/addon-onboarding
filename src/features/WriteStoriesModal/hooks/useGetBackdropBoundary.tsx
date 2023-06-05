import { useEffect, useState } from "react";

// get an element and return its boundary. It accepts a classname as argument
export const useGetBackdropBoundary = (className: string, active: boolean) => {
  const [boundary, setBoundary] = useState<{
    top: number;
    left: number;
    height: number;
    width: number;
  } | null>(null);

  const element = document.querySelector(`.${className}`) as HTMLElement;

  // setBoundary if element changes sized. use resize observer
  useEffect(() => {
    if (active) {
      const resizeObserver = new ResizeObserver(() => {
        if (element) {
          setBoundary({
            top: element.offsetTop,
            left: element.offsetLeft,
            height: element.offsetHeight,
            width: element.offsetWidth,
          });
        }
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [className, active]);

  return boundary;
};
