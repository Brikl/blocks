import { blocks } from './blocks';

export function index(): Promise<any> {
  return blocks();
};

index();

/*
import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import program from 'commander';
clear()
console.log(
  chalk.red(figlet.textSync('brikl-pizza', { horizontalLayout: 'full' }))
)
program
  .version('0.0.1')
  .description("An example CLI for ordering pizza's")
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese <type>', 'Add the specified type of cheese [marble]')
  .option('-C, --no-cheese', 'You do not want any cheese')
  .parse(process.argv)
console.log('you ordered a pizza with:')
if (program.peppers) console.log('  - peppers')
if (program.pineapple) console.log('  - pineapple')
if (program.bbq) console.log('  - bbq')
const cheese: string =
  true === program.cheese ? 'marble' : program.cheese || 'no'
console.log('  - %s cheese', cheese)
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
*/