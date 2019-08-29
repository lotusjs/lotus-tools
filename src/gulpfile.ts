import * as gulp from 'gulp';
import { build } from './tasks';
import debug from './debug';

// 编译为ES模块
gulp.task('build-with-es', done => {
  debug.log('Build to es...');
  build(false).on('finish', done);
});

// 编译为JS模块
gulp.task('build-with-lib', done => {
  debug.log('build to lib...');
  build().on('finish', done);
});

// 编译组件
gulp.task('build', gulp.parallel('build-with-es', 'build-with-lib'));
