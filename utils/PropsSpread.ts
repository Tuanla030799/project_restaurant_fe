export type PropsSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>
