import { handle as helloWorld } from './functions/hello-world'
import { handle as helloWorld2 } from './functions/hello-world-2'

const functions = { helloWorld, helloWorld2 }

type Arguments<T extends (args: any) => any> = T extends (args: infer P) => any ? P : never

const invokeLambda = <T extends { [key: string]: (args: any) => any }>(functions: T) => {
  return <K extends keyof T>(functionName: K, payload: Arguments<T[K]>): ReturnType<T[K]> => {
    const func = functions[functionName](payload)
    return func(payload)
  }
}
const b = invokeLambda(functions)
const c = b('helloWorld', { name: 'World' })
const z = b('helloWorld2', { age: 2 })
c.data
z.data
