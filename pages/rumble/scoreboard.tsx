import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import backgroundImage from "../../public/images/background2.jpg";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

import { SplitText } from "@/lib/SplitText";
import { useRef } from "react";
import FadeIn from "@/components/Animation/FadeIn";
import Link from "next/link";
import PinkPulse from "@/components/PinkLine/PinkPulse";

import { ParsedUrlQuery } from "querystring";
import api from "@/lib/cache";
import { TeamSmall } from "@/types/types";

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  teams: TeamSmall[];
};

export const Scoreboard: NextPage<Props> = ({ teams }: Props) => {
  const text = useRef<HTMLDivElement>();
  gsap.registerPlugin(SplitText);
  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      animateText();
    });
  }, []);

  async function animateText() {
    const mySplitText = new SplitText("#split-text", {
        reduceWhiteSpace: false,
        wordDelimiter: " ",
      }),
      tl = gsap.timeline(),
      numChars = mySplitText.chars.length;

    for (let i = 0; i < numChars; i++) {
      tl.from(mySplitText.chars[i], 2, { opacity: 0 }, Math.random() * 2);
    }
  }

  return (
    <div>
      <Head>
        <title>Devcon 2022</title>
        <meta name="description" content="Spin Growth Devcon 2022" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="fixed z-50 flex items-center justify-between h-2 p-4">
        <FadeIn delay={1}>
          <Link
            href="/"
            className="mt-2 text-lg underline cursor-pointer underline-offset-4 link-underline"
          >
            home
          </Link>
        </FadeIn>
      </header>

      <div className="w-screen h-full">
        <div
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
          }}
        >
          <Image
            alt="Devcon 2022"
            src={backgroundImage}
            layout="fill"
            className="-z-10"
            objectFit="cover"
            objectPosition="center center"
            placeholder="blur"
            quality={100}
          />
        </div>

        <div className="z-50 flex flex-col items-center content-center justify-center w-full h-full py-20 m-auto md:w-2/3">
          <div className="z-50 w-full px-8">
            <div
              id="split-text"
              className="mb-12 text-2xl uppercase md:text-4xl font-joystix"
            >
              Scoreboard
              <span className="transition duration-100 opacity-0 animate-pulse2">
                <PinkPulse />
              </span>
            </div>
            <div className="grid grid-cols-[50px,2fr,1fr] gap-y-8 gap-x-4">
              {teams &&
                teams.map((t, idx) => {
                  return (
                    <>
                      <div
                        key={t.name}
                        className="text-sm md:text-2xl font-joystix"
                      >
                        # {idx + 1}
                      </div>

                      <div>
                        {/* <div className="mb-2 text-2xl font-opensans">
                          {t.name}
                        </div> */}
                        <div className="mb-2 text-lg md:text-2xl font-opensans">
                          <Link href={`/rumble/${t.name.toLowerCase()}`}>
                            {t.name}
                          </Link>
                        </div>
                        <div className="hidden text-sm font-light text-gray-300 md:block font-opensans">
                          {t.members.join(", ")}
                        </div>
                      </div>
                      <div className="items-end text-sm md:self-center md:text-2xl font-joystix justify-self-end">
                        {t.points} PTS
                      </div>

                      <div
                        className="border-t-2 solid"
                        style={{
                          gridColumn: "1 / 5",
                          borderColor: "#FA0080",
                        }}
                      ></div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await api.cache.get();
    const teamCache: TeamSmall[] = await api.list();

    return { props: { teams: teamCache ?? [] } };
  } catch (error) {
    console.log("error ", error);

    return {
      props: { teams: [] },
    };
  }
};

export default Scoreboard;
