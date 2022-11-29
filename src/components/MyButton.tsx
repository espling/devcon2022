import clsx from "clsx";

type Props = {
  size: GlobalTypeHelper<"xs" | "sm">;
};

type GlobalTypeHelper<T extends string> = T | Omit<string, T>;

export const MyButton: React.FC<Props> = ({ size }) => {
  return <button type={"button"} className={clsx("p-2", size)} />;
};

export default MyButton;

export const MyReactComponent: React.FC = () => {
  return <MyButton size="sm" />;
};
