#!/usr/bin/env node

// 控制日志输出
process.env.DEBUG = 'lotus-tools:*';

import { Command } from 'commander';
import * as packageInfo from '../package.json';
import createComponent from './create-component';
import debug from './debug';

const version = packageInfo.version;
const program = new Command();
const gulp = require('gulp');

export function runTask(taskName) {
  const metadata: {
    [key: string]: any
  } = {
    task: taskName
  };
  const taskInstance = gulp.task(taskName);
  if (taskInstance === undefined) {
    gulp.emit('task_not_found', metadata);
    return;
  }
  const start = process.hrtime();
  gulp.emit('task_start', metadata);
  try {
    taskInstance.apply(gulp);
    metadata.hrDuration = process.hrtime(start);
    gulp.emit('task_stop', metadata);
    gulp.emit('stop');
  } catch (err) {
    err.hrDuration = process.hrtime(start);
    err.task = metadata.task;
    gulp.emit('task_err', err);
  }
}

program
  .version(version, '-v, --version', 'output the current version');

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

/**
 * 编译组件命令
 * @option -w, --watch 是否监听文件改动
 */
program
  .command('build')
  .description('build component')
  .option("-w, --watch", "watch file change")
  .action(function(options) {
    require('./gulpfile');
    if (options.watch) {
      process.env.TASK_NAME = 'start';
      runTask('start');
    } else {
      process.env.TASK_NAME = 'build';
      runTask('build');
    }
  });

program.parse(process.argv);
