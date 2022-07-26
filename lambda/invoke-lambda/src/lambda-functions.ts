import * as functionsList from './functions-list'

export const LambdaFunctions = (() => {
  return Object.keys(functionsList).reduce(
    (acc, key) => ({
      ...acc,
      [key]: key,
    }),
    {} as { [K in keyof typeof functionsList]: K },
  )
})()
