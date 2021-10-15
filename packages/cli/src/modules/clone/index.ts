import degit from 'degit'
import { resolve } from 'path/posix'

import { templates } from '../../constants/templates'

interface CloneOptions {
  projectName: string
  templateId: TemplateType
  repository?: string
}

export function clone(options: CloneOptions) {
  const { projectName, templateId, repository = 'brikl/blocks' } = options
  const template = templates[templateId]
  if (!template) return

  const { title, directory } = template
  const cloneRef = `${repository}/${directory}`

  const outputPath = `./${projectName}`

  return new Promise((resolve, reject) => {
    const cloner = degit(cloneRef, {force: true})

    cloner.on('info', info => {
      console.log(info.message)
    })

    // TODO: You might either need to create (mkdir) a directory first,
    // or it may create one for you. Please experiment.
    cloner.clone(outputPath).then(() => {
      console.log('done');
    })
  })
}
