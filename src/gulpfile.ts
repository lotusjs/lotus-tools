import * as gulp from 'gulp';
import { build } from './tasks/build';
import { getComponentDir } from './utils/utils';
import debug from './debug';

// 编译为ES模块
gulp.task('build-with-es', done => {
  debug.log('Build to es...');
  build(false).on('finish', done);
  debug.log('build to es success');
});

// 编译为JS模块
gulp.task('build-with-lib', done => {
  debug.log('build to lib...');
  build().on('finish', done);
  debug.log('build to lib success');
});

// 编译组件
gulp.task('build', gulp.parallel('build-with-es', 'build-with-lib'));

// watch组件修改
gulp.task('start', gulp.series('build', () => {
  debug.log('start watch ....');
  const componentDir = getComponentDir();
  gulp.watch([`${componentDir}/**/*`], gulp.parallel('build'));
}));
