import { getTotalCompleted } from "@/lib/getTotalCompleted";
import { Tasks, Team } from "@/types/types";
import Link from "next/link";
import React from "react";

type Props = {
  teams: Team[];
  location: string;
};

export const TeamTable: React.FC<Props> = ({ teams, location }) => {
  return (
    <>
      {teams &&
        teams
          .filter((team) => team.location === location)
          .map((t, idx) => {
            return (
              <React.Fragment key={t.name}>
                <div>
                  <div className="mb-2 text-2xl font-opensans">
                    <Link href={`/rumble/${t.name.toLowerCase()}`}>
                      {t.name}
                    </Link>
                  </div>
                  <div className="mb-4 text-sm font-light text-gray-300 font-opensans">
                    {t.members.join(", ")}
                  </div>
                </div>
                <div className="justify-self-end">
                  <div className="items-center mb-2 text-sm md:text-lg font-opensans justify-self-center">
                    {getTotalCompleted(t.tasks)} / {t.tasks.length ?? 10}
                  </div>

                  <div className="items-end self-center mb-4 text-sm md:text-2xl font-joystix justify-self-end">
                    {t.points} PTS
                  </div>
                </div>
                <div
                  className="mb-4 border-t-2 solid"
                  style={{
                    gridColumn: "1 / 5",
                    borderColor: "#FA0080",
                  }}
                ></div>
              </React.Fragment>
            );
          })}
    </>
  );
};
