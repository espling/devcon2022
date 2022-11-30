import Head from "next/head";
import { gsap } from "gsap";
import { SplitText } from "@/lib/SplitText";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { useRef, useState } from "react";

import Agenda from "@/components/Logo/Agenda";
import FadeIn from "@/components/Animation/FadeIn";
import AgendaText from "@/components/AgendaText/AgendaText";
import Text from "@/components/Text/Text";
import LinkElement from "@/components/Link/LinkElement";
import { randomNumber } from "@/lib/randomNumber";
import Link from "next/link";
import DevconLogo from "@/components/Logo/DevconLogo";
import Peekaboo from "@/components/Peekaboo/Peekaboo";

export default function Home() {
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);
  const outerRef = useRef<Array<HTMLElement | null>>([]);
  const innerRef = useRef<Array<HTMLElement | null>>([]);

  const imagesRef = useRef<Array<HTMLElement | null>>([]);

  const [loaded, setLoaded] = useState(false);
  const agendaText = useRef<any>();
  const agendaContainer = useRef<any>();
  const currentRef = useRef<number | undefined>();
  const [page, setNextPage] = useState(0);
  const [implodeText, setImplodeText] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [chars, setChars] = useState<any[]>();
  const tlDefaults = {
    ease: "slow.inOut",
    duration: 0.5,
  };

  gsap.registerPlugin(SplitText);

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

  // const changeNavBackground = () => {
  //   console.log("test2");
  //   console.log(window.scrollY);
  //   if (window.scrollY >= 66) {
  //     setNavbar(true);
  //   } else {
  //     setNavbar(false);
  //   }
  // };

  // useIsomorphicLayoutEffect(() => {
  //   window.addEventListener("scroll", changeNavBackground);
  //   return () => {
  //     window.removeEventListener("scroll", changeNavBackground);
  //   };
  // }, []);

  useIsomorphicLayoutEffect(() => {
    gsap.set(outerRef.current, { yPercent: 100 });
    gsap.set(innerRef.current, { yPercent: -100 });
    const splitText = new SplitText("#agenda-text");
    const chars = splitText.chars;
    setChars(chars);
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
              animateText();
            });
            // setImplodeText(true);
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

  // function animateLink() {
  //   gsap.set("#link-wrapper", { autoAlpha: 1 });
  //   let split = new SplitText("#schedule-link", { type: "chars" });
  //   let animation = gsap.timeline({});
  //   animation.from(split.chars, {
  //     opacity: 0,
  //     y: 50,
  //     ease: "back(4)",
  //     stagger: {
  //       from: "end", //try "center" and "edges"
  //       each: 0.05,
  //     },
  //   });
  // }

  async function animateText() {
    // const ctx = gsap.context(() => {

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
            delay: 0.2 + Math.random() * 0.3,
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

  // function animateTextOut() {
  //   gsap.set(sectionsRef.current[currentRef.current ?? 0], { zIndex: 1 });
  //   gsap.set(sectionsRef.current[page], { autoAlpha: 1, zIndex: 0 });
  //   // gsap.set(splitHeadings[next].chars, { autoAlpha: 0, yPercent: 100 });
  //   gsap.set([outerRef.current[page], innerRef.current[page]], { yPercent: 0 });
  //   gsap.set(imagesRef.current[page], { yPercent: 0 });
  //   const tlDefaults = {
  //     ease: "slow.inOut",
  //     duration: 1.25,
  //   };
  //   gsap
  //     .timeline({
  //       defaults: tlDefaults,
  //       onComplete: () => {
  //         currentRef.current = page;
  //       },
  //     })
  //     .to(outerRef.current[currentRef.current ?? 0], { yPercent: 100 }, 0)
  //     .to(innerRef.current[currentRef.current ?? 0], { yPercent: -100 }, 0)
  //     .to(imagesRef.current[currentRef.current ?? 0], { yPercent: 15 }, 0)
  //     .from(imagesRef.current[page], { yPercent: -15 }, 0)
  //     .set(imagesRef.current[currentRef.current ?? 0], { yPercent: 0 });
  // }

  // useIsomorphicLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     if (page === 0) {
  //       animateLink();
  //     }
  //   });
  //   return () => ctx.revert();
  // }, [animate]);

  const textOpacity = page === 1 && animate ? "opacity-0" : "opacity-100";
  // const navBarBg = navBar ? "" : "";
  return (
    <div className="flex flex-col overflow-x-hidden overflow-y-hidden">
      <Head>
        <title>Devcon 2022</title>
        <meta name="description" content="Spin Growth Devcon 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="overflow-x-hidden overflow-y-hidden">
        <header className="fixed z-50 flex items-center justify-between h-2 p-4">
          {page === 1 && !animate && (
            <FadeIn delay={1}>
              <LinkElement
                text="BACK"
                cb={() => {
                  if (!animate) setNextPage(0);
                }}
              />
            </FadeIn>
          )}
          {page === 0 && !animate && loaded && (
            <div className="flex items-end justify-between">
              {/* <div id="link-wrapper" ref={linkText}> */}
              <FadeIn delay={0.7}>
                <LinkElement
                  text="SCHEDULE"
                  id="schedule-link"
                  cb={() => {
                    if (!animate) setNextPage(1);
                  }}
                />
              </FadeIn>
              {/* </div> */}
              <FadeIn delay={1.0}>
                <Link
                  href="rumble"
                  className="mt-2 ml-8 text-lg underline cursor-pointer underline-offset-4 link-underline"
                >
                  RUMBLE
                </Link>
              </FadeIn>
            </div>
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
              <div className="w-3/4 mt-20 ml-10 sm:w-1/2 xl:w-1/3 sm:ml-auto sm:mr-40">
                {!animate && (
                  <FadeIn delay={0.5}>
                    {/* <div className="w-48 sm:w-96">
                        <Logo />
                      </div>

                      <div className="flex flex-col items-end mt-6 ml-auto w-36 h-36">
                        <CompanyNames />
                      </div> */}

                    <DevconLogo />
                  </FadeIn>
                )}
              </div>

              {/* <div ref={(el) => (innerRef.current[0] = el)} className=""> */}
              <div
                ref={(el) => (imagesRef.current[0] = el)}
                className="absolute top-0 flex w-full h-full"
                style={{
                  backgroundImage: 'url("/images/background1.png")',
                  height: "100%",
                  zIndex: "-1",
                  // backdropFilter: "blur(18px)",
                  // filter: "blur(18px)",
                  width: "100%",
                  overflow: "hidden",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              >
                {/* <PinkLine /> 
                transform duration-500
                 -bottom-full
                */}
              </div>
              {page === 0 && <Peekaboo />}
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
              className="flex flex-col w-full h-screen overflow-x-hidden"
            >
              <div
                ref={(el) => (imagesRef.current[1] = el)}
                className="absolute top-0 flex flex-col items-center justify-center w-full min-h-full mb-20 xl:justify-start"
                style={{
                  backgroundImage: 'url("/images/background2.jpg")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  ref={agendaContainer}
                  className={`grid pb-24 max-w-screen-md grid-cols-1 mx-4 gap-x-2 xl:mx-auto lg:w-1/2 gap-y-1 ${textOpacity}`}
                >
                  <div className="mt-20 w-36 md:w-52">
                    <FadeIn delay={0.6}>
                      <Agenda />
                    </FadeIn>
                  </div>
                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div">13:00 - 13:40</Text>
                  </AgendaText>
                  <AgendaText size="md" ref={agendaText}>
                    <Text tagName="div">DevCon Opening</Text>
                    <Text tagName="p">Andreas Nilsson & Niklas Karvonen</Text>
                  </AgendaText>

                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div">14:00 - 14:40</Text>
                  </AgendaText>

                  <AgendaText size="md" ref={agendaText}>
                    <div>
                      <Text tagName="div">Let the type guide the way</Text>
                      <Text tagName="p">
                        Peter Wikström, Robin Olsson, Tobias Åkeblom & Jimmie
                        Espling
                      </Text>
                    </div>

                    <div className="mt-6">
                      <Text tagName="div">
                        Design Guidelines from Apple, Google & Microsoft: How
                        different are they?
                      </Text>
                      <Text tagName="p">Robert Stjärnström</Text>
                    </div>
                    <div className="mt-6">
                      <Text tagName="div">Accelerators for remote teams</Text>
                      <Text tagName="p">Niklas Sörengård</Text>
                    </div>
                    <div className="mt-6">
                      <Text tagName="div">
                        ML/BI/Data news and trends, 8 minutes each.
                      </Text>
                      <Text tagName="p">
                        Generative Models (Emanuel Johansson)
                      </Text>
                      <Text tagName="p">NLP (Ewa Tusien)</Text>
                      <Text tagName="p">
                        Data democratization (Joycelyn Gustavsson)
                      </Text>
                      <Text tagName="p">
                        BI (Gowthami Kuttapalayam Mothilal)
                      </Text>
                      <Text tagName="p">Regulations (Filip Drmac)</Text>
                    </div>

                    <div className="mt-6">
                      <Text tagName="div">Teams Operator Connect</Text>
                      <Text tagName="p">Patrik Sandlund</Text>
                    </div>
                  </AgendaText>

                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div">14:40 - 15:00</Text>
                  </AgendaText>
                  <AgendaText size="md" ref={agendaText}>
                    <Text tagName="div">Brain break</Text>
                  </AgendaText>

                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div">15:00 - 15:50</Text>
                  </AgendaText>
                  <AgendaText size="md" ref={agendaText}>
                    <div>
                      <Text tagName="div">
                        Make it easy to be lazy - Reusable code
                      </Text>
                      <Text tagName="p">
                        Peter Wikström, Robin Olsson, Tobias Åkeblom & Jimmie
                        Espling
                      </Text>
                    </div>

                    <div className="mt-6">
                      <Text tagName="div">
                        Defining the Role of Design in Our Climate
                      </Text>
                      <Text tagName="p">Hugo Wittorf</Text>
                    </div>
                    <div className="mt-6">
                      <Text tagName="div">
                        When agile is right but the method is wrong
                      </Text>
                      <Text tagName="p">Niklas Sörengård</Text>
                    </div>
                    <div className="mt-6">
                      <Text tagName="div">
                        RPA news and trends, 8 minutes each:
                      </Text>
                      <Text tagName="p">UI Path (Linus Engman)</Text>
                      <Text tagName="p">Blueprism (Dmitrij Mamajev)</Text>
                      <Text tagName="p">Power Automate (Filip Drmac)</Text>
                      <Text tagName="p">Open source (Ellinor Widman)</Text>
                    </div>

                    <div className="mt-6">
                      <Text tagName="div">Tune in to Intune Session</Text>
                      <Text tagName="p">Cloudspin workshop</Text>
                    </div>
                  </AgendaText>

                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div"> 16:10 - 18:00</Text>
                  </AgendaText>
                  <AgendaText size="md" ref={agendaText}>
                    <Link href="rumble">
                      <Text tagName="div">Team rumble</Text>
                    </Link>
                  </AgendaText>

                  <AgendaText size="lg" ref={agendaText}>
                    <Text tagName="div">18:00 - 22:00</Text>
                  </AgendaText>
                  <AgendaText size="md" ref={agendaText}>
                    <Text tagName="div">AW & Food</Text>
                  </AgendaText>
                </div>
                {/* <PinkLine /> */}
                {/* )} */}
                {/* {implodeText && (
                  <div className="pt-8 mt-auto mb-20 sm:mb-4">
                    <FadeIn>
                      <Logos />
                    </FadeIn>
                  </div>
                )} */}
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
