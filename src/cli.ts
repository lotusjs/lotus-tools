#!/usr/bin/env node

// 控制日志输出
process.env.DEBUG = 'lotus-tools:*';

import { Command } from 'commander';
import * as packageInfo from '../package.json';
import createComponent from './create-component';
import debug from './debug';

const version = packageInfo.version;
const program = new Command();

program
  .version(version, '-v, --version', 'output the current version')
  .option('-i, --init', 'init');

/**
 * 编译组件命令
 */
program
  .command('build')
  .description('build component')
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    console.log('test build');
  });

/**
 * 创建组件命令
 * @option -n, --component_name 组件名称
 */
program
  .command('create')
  .description('create component')
  .option("-n, --component_name [name]", "component name")
  .action(function(options) {
    if (!options || !options.component_name) {
      debug.error('Component name is required，example: lotus-tools create -n button');
      return;
    }
    createComponent(options.component_name)
  });


program.parse(process.argv);

