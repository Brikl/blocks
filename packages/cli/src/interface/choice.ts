export interface Answer {
    gitprov: Provivder;
    gituser: string;
    site_type: sitetype;
    files: Object;
    overwrite?: boolean;
}
export interface Choice {
    name: string;
    value: UniversalChoiceValue | 
           github | 
           sitetype |
           Provivder;
}

export enum UniversalChoiceValue {
    ALL = 'ALL',
    LICENSE = 'LICENSE',
    README = 'README',
    PACKAGE_JSON = 'package.json',
    TSCONFIG = 'tsconfig.json',
    YARN_LOCK = 'yarn.lock',
    NEXT_ENV = 'next-env.d.ts',
    NEXT_CONFIG = 'next.config.js',
    POSTCSS_CONFIG = 'postcss.config.js',
    TAILWIND_CONFIG = 'tailwind.config.js',
    CONTRIBUTING = 'CONTRIBUTING.md',
}

export enum github {
    BUG_REPORT = 'BUG_REPORT',
    FEATURE_REQUEST = 'FEATURE_REQUEST',
    PULL_REQUEST = 'PULL_REQUEST',
    SECURITY = 'SECURITY',
}

export enum sitetype {
    NEXTJS_STATIC = ' NEXTJS_STATIC',
    NEXTJS = 'NEXTJS'
}
export enum Provivder {
    GITHUB = 'Github'
}