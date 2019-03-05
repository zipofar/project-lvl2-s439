#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and show a difference.')
  .version('0.0.4', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .action((pathToFileBefore, pathToFileAfter) => {
    console.log(gendiff(pathToFileBefore, pathToFileAfter));
  })
  .parse(process.argv);
