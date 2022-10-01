// Ref: https://github.com/perimetre/helpers/blob/master/src/types/index.ts#L4
export type UnpackPromise<T> = T extends Promise<infer U> ? U : T;
