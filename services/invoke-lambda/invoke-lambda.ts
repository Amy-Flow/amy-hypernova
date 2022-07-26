import { lambdaFunctions } from '@amyflow/lambda-core'

const isDevelopment = process.env.NODE_ENV !== 'production'
type Args<T, K> = {
  functionName: T
  payload: K
}

type ArgumentTypes<F extends Function> = F extends (args: infer A) => any ? A : never

export type Constructable<T> = new (...args: any[]) => T

const combineFunctions = <T extends Record<PropertyKey, (...a: any[]) => any>>(funcs: T) => {
  return <K extends keyof T>(key: K, ...params: Parameters<T[K]>): ReturnType<T[K]> =>
    funcs[key](...params)
}

type LambdaFunctions = typeof lambdaFunctions
type LambdaFunctionNames = keyof LambdaFunctions
type LambdaFunction = typeof lambdaFunctions[keyof typeof lambdaFunctions]
type LambdaFunctionArguments = Parameters<LambdaFunction>

type LambdaFunctionArgumentTypes<F extends LambdaFunction> = F extends (args: infer A) => any
  ? A
  : never

type BoundThunk<T extends (...args: any[]) => (...args: any[]) => any> = (
  ...args: Parameters<T>
) => ReturnType<ReturnType<T>>
export const invokeLambda = async <
  K extends keyof typeof lambdaFunctions,
  F extends typeof lambdaFunctions[K],
>({
  functionName,
  payload,
}: Args<K, LambdaFunctionArgumentTypes<F>>) => {
  const lambdaFunction = lambdaFunctions[functionName]
  return lambdaFunction(payload)
}
;(async () => {
  const a = await invokeLambda({ functionName: 'helloWorld', payload: { name: 123 } })
  console.log(a)
})()
