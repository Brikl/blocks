type TemplateType = 'nextjs' | 'react-static'

interface ITemplate {
  title: string
  directory: string
}

export const templates: Record<TemplateType, ITemplate> = {
  'nextjs': {
    title: 'Next.js',
    directory: 'examples/with-nextjs',
  },
  'react-static': {
    title: 'React Static',
    directory: 'examples/with-react-static',
  },
}

