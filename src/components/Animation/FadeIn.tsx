import React, { useRef } from "react";
import { gsap } from "gsap";

import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { JsxElement } from "typescript";

type Props = {
  children?: React.ReactNode;
  delay?: number;
};

const FadeIn = ({ children, delay = 0.5 }: Props) => {
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.to(el.current, {
      x: 0,
      y: 0,
      opacity: 1,
      delay: delay,
      duration: 1.5,
      ease: "power4.out",
    });
  }, []);

  return (
    <div className="transition-transform opacity-0" ref={el}>
      {children}
    </div>
  );
};

export default FadeIn;
