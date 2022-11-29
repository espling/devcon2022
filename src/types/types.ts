export type ActionTypes = typeof import("@/constants/constants");
export type Action = ActionTypes[keyof ActionTypes];
export type Ref = HTMLDivElement;





export type Teams = {
    teams: Team[];
    tasks: Tasks[];

}
export type TeamAndAllTasks = {
    team: Team;
    tasks: Tasks[];
}

export type Tasks = {
    id: number;
    title: string;
    points: number;
    description: string;
    completed: boolean;
}

export type Location = "North" | "South";

export interface Team {
    name: string,
    location: Location,
    members: string[],
    points: number,
    tasks: Tasks[]
}

export type TeamSmall = Omit<Team, "tasks">

