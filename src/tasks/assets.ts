import * as gulp from 'gulp';
import { getComponentDir, getProjectPath } from '../utils/utils';

const esDir = getProjectPath('es');

// 拷贝静态资源
export function copyAssets() {
  const componentDir = getComponentDir();

  return gulp.src([`${componentDir}/**/*.@(png|svg|jpg)`])
    .pipe(gulp.dest(esDir));
}
