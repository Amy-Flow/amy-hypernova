type EventType = {
  name: string
}
export const handle = ({ name }: EventType) => {
  return {
    data: `Hello ${name}`,
  }
}
