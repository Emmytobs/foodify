export type Nil = null | undefined;

export const isNil = (a: any): a is Nil => a === null || a === undefined