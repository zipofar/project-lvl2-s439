#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and show a difference.')
  .version('0.1.4', '-V, --version')
  .option('-f, --format [type]', 'Output format', 'plain')
  .action((pathToFileBefore, pathToFileAfter, options) => {
    console.log(gendiff(pathToFileBefore, pathToFileAfter, options.format));
  })
  .parse(process.argv);
