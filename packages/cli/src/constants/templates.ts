type TemplateType = 'nextjs' | 'react-static'

interface ITemplate {
  title: string
  directory: string
}

const templates: Record<TemplateType, ITemplate> = {
  nextjs: {
    title: 'Next.js Starter',
    directory: 'examples/with-nextjs',
  },
  'react-static': {
    title: 'React Static Starter',
    directory: 'examples/with-react-static',
  },
}
