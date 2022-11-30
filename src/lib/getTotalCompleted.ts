import { Tasks } from "@/types/types";

export const getTotalCompleted = (tasks: Tasks[]) => {
    return tasks.filter((t) => t.completed).length;
};