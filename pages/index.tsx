import Head from "next/head";
import { gsap } from "gsap";
// import Image from "next/image";

import { SplitText } from "@/lib/SplitText";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useRef, useState } from "react";
import Logo from "@/components/Logo/Logo";
import CompanyNames from "@/components/Logo/CompanyNames";
import Logos from "@/components/Logo/Logos";
import Agenda from "@/components/Logo/Agenda";
import FadeIn from "@/components/Animation/FadeIn";
import AgendaText from "@/components/AgendaText/AgendaText";
import LinkElement from "@/components/Link/Link";
import { randomNumber } from "@/lib/randomNumber";
// import bg1 from "../public/images/background1.png";
// import bg2 from "../public/images/background2.png";

export default function Home() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const outerRef = useRef<Array<HTMLElement | null>>([]);
  const innerRef = useRef<Array<HTMLElement | null>>([]);

  const imagesRef = useRef<Array<HTMLElement | null>>([]);
  const agendaText = useRef<any>();
  const agendaContainer = useRef<any>();
  const currentRef = useRef<number | undefined>();
  const [page, setNextPage] = useState(0);
  const [implodeText, setImplodeText] = useState(false);
  const [animate, setAnimate] = useState(false);

  const tlDefaults = {
    ease: "slow.inOut",
    duration: 0.5,
  };

  gsap.registerPlugin(SplitText);

  const [loaded, setLoaded] = useState(false);
  // const refImage1 = useRef<HTMLDivElement>(null);

  function checkImageLoaded() {
    const src = imagesRef.current[0]?.style.backgroundImage;
    if (src != null) {
      //@ts-ignore
      const url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, "");
      let img: HTMLImageElement = new window.Image();
      img.onload = function () {
        setLoaded(true);
      };
      img.src = url;
      if (img.complete) setLoaded(true);
    }
  }

  useIsomorphicLayoutEffect(() => {
    gsap.set(outerRef.current, { yPercent: 100 });
    gsap.set(innerRef.current, { yPercent: -100 });
  }, []);

  useIsomorphicLayoutEffect(() => {
    checkImageLoaded();
    if (!loaded) return;
    if (page === 0 && currentRef.current != undefined) {
      slideOut();
    } else {
      slideDown();
    }
  }, [page, loaded]);

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
          setAnimate(false);
          if (page == 1) {
            requestAnimationFrame(() => {
              setImplodeText(true);
            });
          } else {
            setImplodeText(false);
          }

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

  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <Head>
        <title>Devcon 2022</title>
        <meta name="description" content="Spin Growth Devcon 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-x-hidden overflow-y-hidden">
        <header className="fixed z-50 flex items-center justify-between h-2 p-4 w-60">
          {page === 1 && !animate && (
            <FadeIn delay={1}>
              <LinkElement
                text="back"
                cb={() => {
                  if (!animate) setNextPage(0);
                }}
              />
            </FadeIn>
          )}
          {page === 0 && !animate && loaded && (
            <FadeIn delay={1}>
              <LinkElement
                text="schedule"
                cb={() => {
                  if (!animate) setNextPage(1);
                }}
              />
            </FadeIn>
          )}
        </header>

        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="fixed w-full overflow-x-hidden overflow-y-hidden t-0"
        >
          <div
            ref={(el) => (outerRef.current[0] = el)}
            className="w-full overflow-y-hidden"
          >
            <div
              ref={(el) => (innerRef.current[0] = el)}
              className="w-full h-screen overflow-x-hidden overflow-y-hidden"
            >
              {/* <div ref={(el) => (innerRef.current[0] = el)} className=""> */}
              <div
                ref={(el) => (imagesRef.current[0] = el)}
                className="absolute top-0 flex w-full h-full"
                style={{
                  backgroundImage: 'url("/images/background1.png")',
                  height: "100%",
                  width: "100%",
                  overflow: "hidden",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                {/* <Image
                  ref={imageRef1}
                  alt="Devcon 2022"
                  onLoad={() => setLoaded(true)}
                  src={bg1}
                  layout=""
                  className="absolute top-0 flex w-full h-full"
                  objectFit="cover"
                  objectPosition="center center"
                  placeholder="blur"
                  quality={100}
                /> */}

                <div className="flex flex-col items-start mt-20 ml-10 sm:ml-auto sm:mr-40">
                  {!animate && (
                    <FadeIn delay={0.5}>
                      <div className="w-48 sm:w-96">
                        <Logo />
                      </div>

                      <div className="flex flex-col items-end mt-6 ml-auto w-36 h-36">
                        <CompanyNames />
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="fixed w-full overflow-x-hidden overflow-y-hidden t-0"
        >
          <div
            ref={(el) => (outerRef.current[1] = el)}
            className="w-full overflow-y-hidden"
          >
            <div
              ref={(el) => (innerRef.current[1] = el)}
              className="w-full h-screen overflow-x-hidden"
            >
              <div
                ref={(el) => (imagesRef.current[1] = el)}
                className="absolute top-0 flex flex-col items-center justify-center w-full min-h-full mb-20 xl:justify-start"
                style={{
                  backgroundImage: 'url("/images/background2.jpg")',
                  backgroundPosition: "center top",
                }}
              >
                {implodeText && (
                  <div className="mt-8 mb-8 w-36 sm:mb-20 md:w-52">
                    <FadeIn delay={2.3}>
                      <Agenda />
                    </FadeIn>
                  </div>
                )}
                {implodeText && !animate && (
                  <div
                    ref={agendaContainer}
                    className="grid max-w-screen-md grid-cols-1 mx-4 gap-x-2 xl:mx-auto lg:w-1/2 gap-y-2"
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
                      <div>
                        Tromb dev - Type system by Peter Vikström, Robin Olsson,
                        Tobias Åkeblom and Jimmie Espling
                      </div>

                      <div className="mt-6">
                        Tromb UX/UI - ?????? by Robert Stjärnström
                      </div>
                      <div className="mt-6">
                        Tromb PL - Accelerators for remote teams by Niklas
                        Sörengård
                      </div>
                      <div className="mt-6">
                        Substorm - Master or Servant - Assembling the
                        Singularity by Niklas Karvonen
                      </div>

                      <div className="mt-6">
                        Cloudspin - Teams Operator Connect
                      </div>
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
                      <div>
                        Tromb dev - Re-USA-billity by Peter Vikström, Robin
                        Olsson, Tobias Åkeblom and Jimmie Espling
                      </div>

                      <div className="mt-6">
                        Tromb UX/UI - ?????? by Hugo Wittorf
                      </div>
                      <div className="mt-6">
                        Tromb PL - Agile as fuck but fuck scrum by Niklas
                        Sörengård
                      </div>
                      <div className="mt-6">
                        Substorm - Cubicle Terminators by Niklas Karvonen
                      </div>

                      <div className="mt-6">
                        Cloudspin - Tune in to Intune Session
                      </div>
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
                {implodeText && (
                  <div className="pt-8 mt-auto mb-20 sm:mb-4">
                    <FadeIn>
                      <Logos />
                    </FadeIn>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="bottom-0 text-white">Test</div> */}
        </section>
        {/* <footer className="fixed z-50 h-2 p-4 -translate-x-1/2 bottom-10 w-60 left-1/2">
          {page === 1 && <Logos />}
        </footer> */}
      </main>
    </div>
  );
}
