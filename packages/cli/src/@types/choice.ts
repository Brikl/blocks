export interface Answer {
  /** Directory name to initialize the project. */
  name: string

  /** Template to bootstrap the project. */
  template: TemplateType
}

export interface Choice {
  name: keyof Answer
  value: TemplateType
}

export enum TemplateType {
  NEXTJS = 'NEXTJS',
  NEXTJS_STATIC = 'NEXTJS_STATIC',
}
