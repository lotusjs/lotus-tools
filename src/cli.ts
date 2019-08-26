#!/usr/bin/env node

import { Command } from 'commander';
import * as packageInfo from '../package.json';

const version = packageInfo.version;

const program = new Command();

program
  .version(version, '-v, --version', 'output the current version')
  .option('-i, --init', 'init');

program
  .command('build')
  .description('build component')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    console.log('test build');
  });


program.parse(process.argv);

