import * as gulp from 'gulp';
import { getComponentDir } from '../utils/utils';

// 拷贝静态资源
export function copyAssets(dir: string) {
  const componentDir = getComponentDir();

  return gulp.src([`${componentDir}/**/*.@(png|svg|jpg)`])
    .pipe(gulp.dest(dir));
}
