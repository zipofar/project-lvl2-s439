#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and show a difference.')
  .version('0.0.1', '-V, --version')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig) => {
    console.log(gendiff(firstConfig, secondConfig));
  })
  .parse(process.argv);
