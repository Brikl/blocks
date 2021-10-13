import figlet from 'figlet'
import { red, green, cyan } from 'kleur'
import { print } from '../interface/terminal-ptint'

const newLine = '\n'

export const showTitleandSubtitle = (): void => {
  console.log(cyan(figlet.textSync(print.Title, { horizontalLayout: 'full' })))
  console.info(cyan(print.Subtitle))
}

export const showError = (message: string | Error): void => {
  console.error(red(print.Error) + message)
}

export const showSuccess = (message: string): void => {
  console.log(green(print.Success) + message + newLine)
}

export const showInfo = (message: string): void => {
  console.info(cyan(print.Information) + message + newLine)
}

export const showGenerate = (fileName: string): void => {
  console.log(cyan(print.Genarated) + `${fileName}...`)
}

export const showCreate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(print.Generating) + `${fileName} in ${filePath}`)
    : console.log(green(print.Generating) + `${fileName}`)
}

export const showUpdate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(print.Update) + `${fileName} in ${filePath}`)
    : console.log(green(print.Update) + `${fileName}`)
}
