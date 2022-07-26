export type Payload = {
  name: string
}

export type Response = {
  data: string
}

export const handle = ({ name }: Payload): Response => {
  return {
    data: `Hello ${name}`,
  }
}
