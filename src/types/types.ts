export type ActionTypes = typeof import("@/constants/constants");

export type Action = ActionTypes[keyof ActionTypes];

