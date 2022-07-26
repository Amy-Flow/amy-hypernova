import * as functionsList from './functions-list'

export type LambdaResponse<K extends keyof typeof functionsList> = ReturnType<
  typeof functionsList[K]
>
