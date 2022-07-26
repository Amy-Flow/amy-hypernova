type EventType = {
  age: string
}

export const handle = ({ age }: EventType) => {
  return {
    data: `Hello ${age}`,
  }
}
