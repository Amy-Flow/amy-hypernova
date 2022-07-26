import * as functionsList from './functions-list'

type Arguments<T extends (args: any) => any> = T extends (args: infer P) => any ? P : never

// T = { [key: string]: (args: any) => any }
// This is a minimal type of functionsList
// then we get K the K = with the functionNames
const makeInvokeLambda = <T extends { [key: string]: (args: any) => any }>(functions: T) => {
  const invokeLambda2 = async <K extends keyof T>(
    functionName: K,
    payload: Arguments<T[K]>,
  ): Promise<ReturnType<T[K]>> => {
    const func = functions[functionName]
    return func(payload)
  }

  return invokeLambda2
}

const invokeLambda = makeInvokeLambda(functionsList)

export { invokeLambda }
