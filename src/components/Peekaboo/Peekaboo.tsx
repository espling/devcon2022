import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useState } from "react";

const Peekaboo: React.FC = () => {
  const [peekabo, setPeekabo] = useState<boolean | null>(false);
  const [right, setRight] = useState<{ right: string }>({
    right: "1.75rem;",
  });
  useIsomorphicLayoutEffect(() => {
    const start = peekabo ? 2000 : 2500;
    var rand = Math.round(Math.random() * start) + 2000;
    const randomPeekabo = Math.floor(Math.random() * 10);

    const timeout = setTimeout(() => {
      setRight({
        right: `${randomPeekabo}rem`,
      });
      setPeekabo((value) => !value);
    }, rand);

    return () => clearTimeout(timeout);
  }, [peekabo]);

  return (
    <div
      style={{
        backgroundImage: 'url("/images/doggie-peekaboo.png")',
        height: "300px",
        width: "300px",
        zIndex: "10",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        ...right,
      }}
      className={`fixed transform duration-700 ${
        peekabo ? "bottom-0" : "-bottom-full"
      }`}
    />
  );
};

export default Peekaboo;
