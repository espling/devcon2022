import React, { useRef } from "react";
import { gsap } from "gsap";

import useIsomorphicLayoutEffect from "../../hooks/useIsomorphicLayoutEffect";
import { JsxElement } from "typescript";

type Props = {
  children?: React.ReactNode;
};

const FadeIn = ({ children }: Props) => {
  const el = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.to(el.current, {
      x: 0,
      y: 0,
      opacity: 1,
      delay: 1,
      duration: 1.5,
      ease: "power4.out",
    });
  }, []);

  return (
    <div className="opacity-0 transition-transform" ref={el}>
      {children}
    </div>
  );
};

export default FadeIn;
