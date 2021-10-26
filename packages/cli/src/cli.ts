import { prompt } from './modules/prompt'
import { clone } from './modules/clone'
import { bootstrap } from './modules/bootstrap'

/** Entry point for the CLI generator. */
export default async function cli() {
  const { projectName, template } = await prompt()

  await clone(projectName, template)

  await bootstrap(projectName)
}
