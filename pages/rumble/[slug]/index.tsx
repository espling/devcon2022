import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import backgroundImage from "../../../public/images/background2.jpg";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { gsap } from "gsap";

import { SplitText } from "@/lib/SplitText";
import { useRef } from "react";
import FadeIn from "@/components/Animation/FadeIn";
import Link from "next/link";
import PinkLine from "@/components/PinkLine/PinkLine";
import PinkPulse from "@/components/PinkLine/PinkPulse";

import { ParsedUrlQuery } from "querystring";
import api from "@/lib/cache";
import { Team, Location, Tasks } from "@/types/types";
import { tasks } from "@/lib/tasks";

export interface IParams extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  team: Team;
  tasks: Tasks[];
};

export const TeamPage: NextPage<Props> = ({ team, tasks }: Props) => {
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

  function getTaskById(id: number) {
    return tasks.find((t) => id === t.id);
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
            href="/rumble"
            className="mt-2 mr-4 text-lg underline cursor-pointer underline-offset-4 link-underline"
          >
            teams
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
        </div>
        <div className="flex flex-col items-center content-center justify-start h-full py-20 mx-8 md:m-auto md:w-2/3 ">
          <div className="z-40 ">
            <div
              id="split-text"
              className="mt-20 mb-20 text-2xl uppercase md:text-4xl font-joystix"
            >
              {team && team.name}
              <span className="transition duration-100 opacity-0 animate-pulse2">
                <PinkPulse />
              </span>
            </div>
            <div>
              {team && (
                <>
                  <div className="mb-20 text-sm font-opensans">
                    {team.members.join(", ")}
                  </div>
                </>
              )}
            </div>

            <div className="md:grid md:grid-cols-[3fr,200px,100px] gap-y-8 gap-x-4">
              {team &&
                team.tasks.map((t, idx) => {
                  const task = getTaskById(t.id);
                  return (
                    <>
                      <div
                        key={t.title}
                        className="mb-4 text-sm md:mb-0 font-opensans"
                      >
                        <span className="font-bold text-gray-300">
                          #{task?.id}
                        </span>{" "}
                        {task?.title ?? "no title"}
                      </div>

                      <div>
                        <div className="pb-2 text-sm break-all md:mb-0 font-opensans">
                          {task?.description ?? ""}
                        </div>
                        <div className="text-sm font-light text-gray-300 font-opensans">
                          {t.completed ? "Completed" : "Not completed"}
                        </div>
                      </div>
                      <div className="items-end self-center mb-4 text-base md:mb-0 font-opensans justify-self-end">
                        {t.points ?? 0} PTS
                      </div>

                      <div
                        className="mb-4 border-t-2 solid md:mb-0"
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;

  try {
    await api.cache.get();
    const teamCache = await api.fetchTeam(slug.toString());
    const taskCache = await api.fetchTasks();
    return { props: { team: teamCache ?? {}, tasks: taskCache } };
  } catch (error) {
    console.log("error ", error);

    return {
      props: { team: {} },
    };
  }
};

export default TeamPage;
