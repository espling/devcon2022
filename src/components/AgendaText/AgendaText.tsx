import React from "react";
import clsx from "clsx";

// Redecalare forwardRef
declare module "react" {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

const sizes = {
  md: "text-xs lg:text-sm",
  lg: "text-xs lg:text-lg",
};

type Props = {
  children: React.ReactNode;
  size: keyof typeof sizes;
};

export type Ref = HTMLDivElement;

const AgendaText = (props: Props, ref: React.ForwardedRef<Ref>) => {
  return (
    <div
      id="agenda-text"
      ref={ref}
      className={clsx(
        "section-heading tracking-widest",

        sizes[props.size]
      )}
    >
      {props.children}
    </div>
  );
};

export default React.forwardRef(AgendaText);
