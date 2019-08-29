import * as gulp from 'gulp';
import { buildTs, copyAssets, build } from './tasks';
import debug from './debug';

// 编译Less
gulp.task('ts', (done) => {
  buildTs().on('finish', done)
});

// 拷贝静态文件
gulp.task('assets', (done) => {
  copyAssets().on('finish', done)
});

// 编译为ES模块
gulp.task('build-with-es', done => {
  debug.log('Build to es...');
  build('es').on('finish', done);
});

// 编译为JS模块
gulp.task('build-with-lib', done => {
  debug.log('build to lib...');
  build('lib').on('finish', done);
});

// 编译组件
gulp.task('build', gulp.parallel('build-with-es', 'build-with-lib'));
