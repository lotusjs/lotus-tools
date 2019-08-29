import * as typescript from 'gulp-typescript';
import * as gulp from 'gulp';
import * as sourceMaps from 'gulp-sourcemaps';
import {
  getComponentDir,
  getProjectPath
} from '../utils/utils';
import getBabelConfig from '../utils/getBabelConfig';
import getTypeScriptConfig from '../utils/getTypeScriptConfig';

const babel = require('gulp-babel');
const tsConfig = getTypeScriptConfig();
const babelConfig = getBabelConfig();

const esDir = getProjectPath('es');

export function buildTs() {
  const componentDir = getComponentDir();
  const source = [
    `${componentDir}/**/*.tsx`,
    `${componentDir}/**/*.ts`,
    'typings/**/*.d.ts'
  ];

  if (tsConfig.allowJs) {
    source.unshift( `${componentDir}/**/*.jsx`,);
  }

  return gulp.src(source)
    .pipe(typescript(tsConfig))
    .pipe(sourceMaps.init())
    .pipe(babel(babelConfig))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(esDir));
}
