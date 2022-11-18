type Props = {
  size: "sm" | "xs";
};

type MyTypeHelper<T extends string> = T | Omit<string, T>;

const MyButton: React.FC<Props> = ({ children }) => {
  return <button type={"button"}>{children}</button>;
};

export default MyButton;

const MyReactComponent = () => {
  return <MyButton size={"sm"}>Test</MyButton>;
};
