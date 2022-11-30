import { Tasks } from '@/types/types';
import { tasks } from './tasks';
import fs from 'fs';
import path from 'path';
import { Team, Teams, TeamSmall } from '@/types/types';

let list: Teams = {
    teams: [],
    tasks: []
};

const api = {
    list: async () => {
        return list.teams;
    },
    //     listSmall: async () => {
    // return list.teams as TeamSmall;
    //     },
    fetch: async (name: Team['name']) => {
        return list.teams.find((team) => team.name === name);
    },
    fetchTeam: async (name: Team['name']) => {
        return list.teams.find((team) => team.name.toLowerCase() === name.toLowerCase());
    },
    fetchTeamsByLocation: async (location: Team['location']) => {
        return list["teams"].filter((team) => team.location.toLowerCase() === location.toLowerCase());
    },
    fetchTasks: async () => {
        return list["tasks"];
    },
    cache: {
        // get: async (): Promise<string | null | undefined> => {
        //     try {
        //         const data = await fs.readFileSync(path.join(process.cwd(), 'teams.db'));
        //         const teamsData: Teams = JSON.parse(data as unknown as string);
        //         list = teamsData;
        //         return JSON.stringify(teamsData);
        //     }
        //     catch {
        //         return 'json error';
        //     }

        // },
        get: async (): Promise<string | null | undefined> => {
            try {
                const data = await fetch('https://espling.z22.web.core.windows.net/teams.json');
                const json = await data.json();
                list = json;
                return JSON.stringify(json);
            }
            catch {
                'json error'
            }
        },
        set: async (json: string) => {
            fs.writeFileSync(
                path.join(process.cwd(), 'teams.db'),
                json
            );
        },
    },
};

export default api;

