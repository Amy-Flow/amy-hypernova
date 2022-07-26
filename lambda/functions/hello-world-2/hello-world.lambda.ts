export type Payload = {
  age: number
}

export type Response = {
  data: number
}

export const handle = ({ age }: Payload): Response => {
  return {
    data: age,
  }
}
