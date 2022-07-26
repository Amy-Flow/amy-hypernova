import { readdirSync } from 'fs'
import { resolve } from 'path'
const getDirectories = (source: string = __dirname) => {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

const getAll = async () => {
  const directories = getDirectories(resolve(__dirname, 'lambda'))
  for (const directory of directories) {
    const main = import(`./lambda/${directory}`)
    return main
  }
}

const getMain = async () => {
  const b = await getAll()
  return b.
}

getMain().catch((err) => {
  console.log(err)
  process.exit(1)
})
