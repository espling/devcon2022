type Props = {
  tagName: "div" | "p";
  children: React.ReactNode;
};

const classes: Record<string, string> = {
  div: "text-xl tracking-tight font-opensans",
  p: "text-xs tracking-tight font-opensans",
} as const;

const Text = ({ tagName: Tag = "p", children, ...props }: Props) => {
  return (
    <Tag {...props} className={classes[Tag]}>
      {children}
    </Tag>
  );
};

export default Text;
