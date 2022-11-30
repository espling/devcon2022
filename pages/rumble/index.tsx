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
import { Team } from "@/types/types";
import { TeamTable } from "@/features/Teams/TeamTable";
import Peekaboo from "@/components/Peekaboo/Peekaboo";

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  teams: Team[];
};

export const Teams: NextPage<Props> = ({ teams }: Props) => {
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
            className="mt-2 mr-4 text-lg underline cursor-pointer underline-offset-4 link-underline"
          >
            home
          </Link>
        </FadeIn>
        <FadeIn delay={1}>
          <Link
            href="/rumble/scoreboard"
            className="mt-2 text-lg underline cursor-pointer underline-offset-4 link-underline"
          >
            scoreboard
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
          <Peekaboo />
        </div>
        <div className="flex flex-col items-center content-center justify-center h-full py-20 m-auto md:w-2/3">
          <div className="z-50 w-full px-8">
            <div
              id="split-text"
              className="mb-12 text-2xl uppercase md:text-4xl font-joystix"
            >
              Teams
              <span className="transition duration-100 opacity-0 animate-pulse2">
                <PinkPulse />
              </span>
            </div>
            <div className="mb-10">North</div>

            <div className="md:grid md:grid-cols-[2fr,1fr] gap-y-8">
              {teams && <TeamTable teams={teams} location={"North"} />}
            </div>
            <div className="mt-20 mb-10">South</div>

            <div className="md:grid md:grid-cols-[2fr,1fr] gap-y-8 ">
              {teams && <TeamTable teams={teams} location={"South"} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await api.cache.get();
    const teamCache = await api.list();
    teamCache.sort((a, b) => (a.points < b.points ? 1 : -1));

    return { props: { teams: teamCache ?? [] } };
  } catch (error) {
    console.log("error ", error);

    return {
      props: { teams: [] },
    };
  }
};

export default Teams;
