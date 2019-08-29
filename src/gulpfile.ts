import * as gulp from 'gulp';
import { buildLess, buildTs, copyAssets } from './tasks';

// 编译Less
gulp.task('less', (done) => {
  buildLess().on('finish', done)
});

// 编译Less
gulp.task('ts', (done) => {
  buildTs().on('finish', done)
});

// 拷贝静态文件
gulp.task('assets', (done) => {
  copyAssets().on('finish', done)
});

// 编译组件
gulp.task('build', gulp.parallel('less', 'ts', 'assets'));
