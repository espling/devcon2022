import { NextPage } from "next";
import Image from "next/image";
import backgroundImage from "../../../public/images/background2.jpg";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

import { SplitText } from "@/lib/SplitText";
import { useRef } from "react";
import FadeIn from "../Animation/FadeIn";
import Link from "next/link";
import PinkLine from "../PinkLine/PinkLine";

export const Rumble: NextPage = () => {
  const text = useRef<HTMLDivElement>();
  // const imagesRef = useRef<HTMLElement | null>();
  // const [loaded, setLoaded] = useState(false);

  gsap.registerPlugin(SplitText);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateText();
    });
  }, []);

  // function checkImageLoaded() {
  //   const src = imagesRef.current?.style.backgroundImage;
  //   if (src != null) {
  //     //@ts-ignore
  //     const url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
  //     let img: HTMLImageElement = new window.Image();
  //     img.onload = function () {
  //       setLoaded(true);
  //     };
  //     img.src = url;
  //     if (img.complete) setLoaded(true);
  //   }
  // }

  // useIsomorphicLayoutEffect(() => {
  //   checkImageLoaded();
  // }, []);

  async function animateText() {
    console.log(text.current);

    const mySplitText = new SplitText("#split-text", {
        // type: "chars, words",
        reduceWhiteSpace: false,
        wordDelimiter: " ",
      }),
      tl = gsap.timeline(),
      numChars = mySplitText.chars.length;

    for (let i = 0; i < numChars; i++) {
      //   console.log(mySplitText.chars[i]);

      //   tl.from(mySplitText.chars, {
      //     duration: 0.8,
      //     opacity: 0,
      //     scale: 0,
      //     y: 80,
      //     rotationX: 180,
      //     transformOrigin: "0% 50% -50",
      //     ease: "back",
      //     stagger: 0.01,
      //   });

      tl.from(mySplitText.chars[i], 2, { opacity: 0 }, Math.random() * 2);
    }
  }

  return (
    <div>
      <header className="fixed z-50 flex items-center justify-between h-2 p-4">
        <FadeIn delay={1}>
          <Link
            href="/"
            className="mt-2 text-lg underline cursor-pointer underline-offset-4 link-underline"
          >
            back
          </Link>
        </FadeIn>
      </header>

      <div className="fixed w-screen h-screen overflow-hidden">
        <Image
          alt="Devcon 2022"
          src={backgroundImage}
          layout="fill"
          className="absolute top-0 flex flex-col items-center justify-center"
          objectFit="cover"
          objectPosition="center center"
          placeholder="blur"
          quality={100}
        />
        {/* <PinkLine /> */}
        <div
          id="split-text"
          // ref={(el) => (text.current = el)}
          className="flex items-center justify-center w-full h-full text-2xl uppercase md:text-4xl font-opensans"
        >
          Coming soon...
          <span className="transition duration-75 opacity-0 animate-pulse2">
            .
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rumble;
