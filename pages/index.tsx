import Head from "next/head";
import { gsap } from "gsap";
import Flip from "gsap/dist/Flip";

import { SplitText } from "@/lib/SplitText";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useRef, useState } from "react";
import Logo from "@/components/Logo/Logo";
import CompanyNames from "@/components/Logo/CompanyNames";
import Logos from "@/components/Logo/Logos";
import Agenda from "@/components/Logo/Agenda";
import FadeIn from "@/components/Animation/FadeIn";
import AgendaText from "@/components/AgendaText/AgendaText";
// import Image from "next/image";
// import bg1 from "../public/images/background1.png";
// import bg2 from "../public/images/background2.png";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (1 + max - min) + min);
};

export default function Home() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const outerRef = useRef<Array<HTMLElement | null>>([]);
  const innerRef = useRef<Array<HTMLElement | null>>([]);
  // const companyNamesRef = useRef<HTMLDivElement | null>(null);
  // const companyNamesContainerRef = useRef<HTMLDivElement | null>(null);

  // const companyEl = useRef<HTMLDivElement>();
  // const q = gsap.utils.selector(companyEl);

  const imagesRef = useRef<Array<HTMLElement | null>>([]);
  const agendaText = useRef<any>();
  const agendaContainer = useRef<any>();
  const currentRef = useRef<number | undefined>();
  const [page, setNextPage] = useState(0);
  const [implodeText, setImplodeText] = useState(false);
  const [animate, setAnimate] = useState(false);

  const tlDefaults = {
    ease: "slow.inOut",
    duration: 1.25,
  };

  gsap.registerPlugin(SplitText);
  // gsap.registerPlugin(Flip);

  useIsomorphicLayoutEffect(() => {
    gsap.set(outerRef.current, { yPercent: 100 });
    gsap.set(innerRef.current, { yPercent: -100 });
    // gsap.set(agendaText.current, { opacity: 0 });
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (page === 0 && currentRef.current != undefined) {
      slideOut();
    } else {
      slideDown();
    }
  }, [page]);

  function slideDown() {
    setAnimate(true);

    let next = page;

    if (currentRef.current !== undefined)
      gsap.set(sectionsRef.current[currentRef.current], { zIndex: 0 });

    gsap.set(sectionsRef.current[next], { autoAlpha: 1, zIndex: 1 });
    gsap.set(imagesRef.current[next], { yPercent: 0 });
    // gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });

    const tl = gsap
      .timeline({
        paused: true,
        defaults: tlDefaults,
        onComplete: () => {
          currentRef.current = next;
          if (page == 1) {
            requestAnimationFrame(() => {
              setImplodeText(true);
            });
          } else {
            setImplodeText(false);
          }
          setAnimate(false);
          // let state = Flip.getState(".box");
          // companyNamesContainerRef.current = companyNamesRef.current;
          // companyNamesRef.current.appendChild(companyNamesContainerRef.current);
          // Flip.from(state, { duration: 1, ease: "power1.out" });
        },
      })
      .from(imagesRef.current[next], { yPercent: 100 }, 0)
      .to([outerRef.current[next], innerRef.current[next]], { yPercent: 0 }, 0);
    // .add(revealSectionHeading(), 0);

    if (currentRef.current !== undefined) {
      tl.add(
        gsap.to(imagesRef.current[currentRef.current], {
          yPercent: -15,
          ...tlDefaults,
        }),
        0
      ).add(
        gsap
          .timeline()
          .set(outerRef.current[currentRef.current], { yPercent: 100 })
          .set(innerRef.current[currentRef.current], { yPercent: -100 })
          .set(imagesRef.current[currentRef.current], { yPercent: 0 })
          .set(sectionsRef.current[currentRef.current], { autoAlpha: 0 })
      );
    }

    tl.play(0);
  }

  function slideOut() {
    setAnimate(true);

    gsap.set(sectionsRef.current[currentRef.current ?? 0], { zIndex: 1 });
    gsap.set(sectionsRef.current[page], { autoAlpha: 1, zIndex: 0 });
    // gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
    gsap.set([outerRef.current[page], innerRef.current[page]], { yPercent: 0 });
    gsap.set(imagesRef.current[page], { yPercent: 0 });

    gsap
      .timeline({
        defaults: tlDefaults,
        onComplete: () => {
          currentRef.current = page;
          setImplodeText(false);
        },
      })
      .to(outerRef.current[currentRef.current ?? 0], { yPercent: 100 }, 0)
      .to(innerRef.current[currentRef.current ?? 0], { yPercent: -100 }, 0)
      .to(imagesRef.current[currentRef.current ?? 0], { yPercent: 15 }, 0)
      .from(imagesRef.current[page], { yPercent: -15 }, 0)
      // .add(revealSectionHeading(), ">-1")
      .set(imagesRef.current[currentRef.current ?? 0], { yPercent: 0 });
    setAnimate(false);
  }

  async function animateText() {
    // const ctx = gsap.context(() => {
    const splitText = new SplitText("#agenda-text");
    const chars = splitText.chars;

    if (chars) {
      for (let x = 0; x < chars!.length; x++) {
        const char = chars[x];
        gsap.fromTo(
          char,
          {
            x: randomNumber(-2000, 2000),
            y: randomNumber(-1000, 1000),
            z: randomNumber(100, 100),
            opacity: 0,
            rotation: randomNumber(360, 720),
            rotationX: randomNumber(-360, 360),
            rotationY: randomNumber(-360, 360),
            ease: "power4.out",
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotation: 0,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            duration: 1,
            delay: 1 + Math.random() * 0.5,
            ease: "power4.out",
          }
        );

        // tl.add(
        //   gsap.to(char, 1, {
        //     x: randomNumber(-2000, 2000),
        //     y: randomNumber(-1000, 1000),
        //     z: randomNumber(100, 100),
        //     opacity: 0,
        //     rotation: randomNumber(360, 720),
        //     rotationX: randomNumber(-360, 360),
        //     rotationY: randomNumber(-360, 360),
        //     ease: "power4.in",
        //     duration: 0.1,
        //   }),
        //   0
        // );

        // });
      }
    }
    // });
    gsap.set(agendaText.current, {
      opacity: 1,
    });
    // return () => ctx.revert();
  }

  function animateTextOut() {
    gsap.set(sectionsRef.current[currentRef.current ?? 0], { zIndex: 1 });
    gsap.set(sectionsRef.current[page], { autoAlpha: 1, zIndex: 0 });
    // gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
    gsap.set([outerRef.current[page], innerRef.current[page]], { yPercent: 0 });
    gsap.set(imagesRef.current[page], { yPercent: 0 });
    const tlDefaults = {
      ease: "slow.inOut",
      duration: 1.25,
    };
    gsap
      .timeline({
        defaults: tlDefaults,
        onComplete: () => {
          currentRef.current = page;
        },
      })
      .to(outerRef.current[currentRef.current ?? 0], { yPercent: 100 }, 0)
      .to(innerRef.current[currentRef.current ?? 0], { yPercent: -100 }, 0)
      .to(imagesRef.current[currentRef.current ?? 0], { yPercent: 15 }, 0)
      .from(imagesRef.current[page], { yPercent: -15 }, 0)
      .set(imagesRef.current[currentRef.current ?? 0], { yPercent: 0 });
  }

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (implodeText) {
        animateText();
      }
    });
    // return => clearTimeout(timeid);
    return () => ctx.revert();
  }, [implodeText]);

  const overflowY = animate ? "overflow-y-hidden" : "overflow-y-auto";

  return (
    <div className="overflow-x-hidden overflow-y-hidden flex flex-col">
      <Head>
        <title>Devcon 2022</title>
        <meta name="description" content="Spin Growth devcon 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-x-hidden overflow-y-hidden">
        <header className="fixed flex items-center justify-between p-4 w-60 h-2 z-50">
          {page === 1 && (
            <FadeIn>
              <div
                onClick={() => {
                  if (!animate) setNextPage(0);
                }}
                className="cursor-pointer"
              >
                back
              </div>
            </FadeIn>
          )}
          {page === 0 && (
            <FadeIn>
              <div
                onClick={() => {
                  if (!animate) setNextPage(1);
                }}
                className="cursor-pointer"
              >
                schedule
              </div>
            </FadeIn>
          )}
        </header>

        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          // className="h-screen max-w-xl t-0 fixed will-change-transform overflow-y-hidden overflow-x-hidden"
          className="w-full t-0 fixed overflow-y-hidden overflow-x-hidden"
        >
          <div
            ref={(el) => (outerRef.current[0] = el)}
            // className="h-full w-full will-change-transform overflow-y-hidden overflow-x-hidden"
            className="w-full overflow-y-hidden"
          >
            <div
              ref={(el) => (innerRef.current[0] = el)}
              // className="h-full w-full will-change-transform overflow-y-hidden overflow-x-hidden"
              className="h-screen w-full overflow-y-hidden overflow-x-hidden"
              // {clsx('text-indigo-600 hover:text-indigo-900', className)}
            >
              <div
                ref={(el) => (imagesRef.current[0] = el)}
                style={{
                  backgroundImage: 'url("/images/background1.png")',
                  display: "flex",
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  top: "0",
                  overflow: "hidden",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                {/* <Image
                  alt="devcon 2022"
                  src={bg1}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="left"
                  quality={100}
                  className="flex items-center justify-center absolute h-full w-full t-0"
                  // className={"opacity-100 md:opacity-70"}
                /> */}
                <div
                  className=" flex flex-col items-start ml-10 sm:ml-auto sm:mr-40 mt-20"
                  // ref={companyEl}
                >
                  <div
                    className="flex w-36 h-36 -rotate-90 box"
                    // ref={companyNamesRef}
                  >
                    {/* <CompanyNames /> */}
                  </div>
                  <div className="w-96">
                    <Logo />
                  </div>
                  <div
                    className="flex w-36 h-36 flex-col items-end ml-auto mt-6"

                    // ref={companyNamesContainerRef}
                  >
                    <CompanyNames />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="w-full t-0 fixed overflow-y-hidden overflow-x-hidden"
        >
          <div
            ref={(el) => (outerRef.current[1] = el)}
            className="w-full overflow-y-hidden"
          >
            <div
              ref={(el) => (innerRef.current[1] = el)}
              className="h-screen w-full overflow-x-hidden"
            >
              <div
                ref={(el) => (imagesRef.current[1] = el)}
                className="mb-20"
                style={{
                  backgroundImage: 'url("/images/background2.jpg")',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  minHeight: "100%",
                  width: "100%",
                  top: "0",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {implodeText && (
                  <div className="w-52 mb-20">
                    <FadeIn>
                      <Agenda />
                    </FadeIn>
                  </div>
                )}
                {implodeText && (
                  <div
                    ref={agendaContainer}
                    className="grid grid-cols-2 gap-4 max-w-screen-md xl:mx-auto lg:w-1/2 mx-4"
                  >
                    <AgendaText size="lg" ref={agendaText}>
                      13:00 - 13:40
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      Joint introduction
                    </AgendaText>

                    <AgendaText size="lg" ref={agendaText}>
                      14:00 - 14:40
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      Sessions by substorm, tromb and cloudspin
                    </AgendaText>

                    <AgendaText size="lg" ref={agendaText}>
                      14:40 - 15:00
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      Coffe
                    </AgendaText>

                    <AgendaText size="lg" ref={agendaText}>
                      15:00 - 15:50
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      Sessions by substorm, tromb and cloudspin
                    </AgendaText>

                    <AgendaText size="lg" ref={agendaText}>
                      16:10 - 18:00
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      Team rumble
                    </AgendaText>

                    <AgendaText size="lg" ref={agendaText}>
                      18:00 - 22:00
                    </AgendaText>
                    <AgendaText size="md" ref={agendaText}>
                      AW and Food
                    </AgendaText>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="bottom-0 text-white">Test</div>
        </section>
        <footer className="fixed bottom-10 p-4 w-60 h-2 left-1/2 -translate-x-1/2 z-50">
          {page === 1 && <Logos />}
        </footer>
      </main>
    </div>
  );
}
