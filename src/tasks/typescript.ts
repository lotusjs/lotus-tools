import * as typescript from 'gulp-typescript';
import * as gulp from 'gulp';
import * as merge2 from 'merge2';
import * as through2 from 'through2';
import * as sourceMaps from 'gulp-sourcemaps';
import { getComponentDir, getDirPath } from '../utils/utils';
import getBabelConfig from '../utils/getBabelConfig';
import getTypeScriptConfig from '../utils/getTypeScriptConfig';
import { cssInjection } from '../utils/style-util';
import * as babel from 'gulp-babel';

const stripCode = require('gulp-strip-code');
const argv = require('minimist')(process.argv.slice(2));
const replaceLib = require('../babel-plugins/replace-lib');
const tsConfig = getTypeScriptConfig();

const esDir = getDirPath('es');
const libDir = getDirPath('lib');

let dir = '';

function babelify(js, modules) {
  const babelConfig = getBabelConfig(modules);

  if (modules === false) {
    babelConfig.plugins.push(replaceLib);
  }

  let stream = js
    .pipe(sourceMaps.init())
    .pipe(babel(babelConfig))
    .pipe(through2.obj(function(file, encoding, next) {
      this.push(file.clone());
      if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
        const content = file.contents.toString(encoding);
        if (content.indexOf("'react-native'") !== -1) {
          next();
          return;
        }
        file.contents = Buffer.from(cssInjection(content));
        file.path = file.path.replace(/index\.js/, 'css.js');
        this.push(file);
        next();
      } else {
        next();
      }
    }))
    .pipe(sourceMaps.write('.'));

  if (modules === false) {
    stream = stream.pipe(
      stripCode({
        start_comment: '@remove-on-es-build-begin',
        end_comment: '@remove-on-es-build-end',
      })
    )
  }

  return stream.pipe(gulp.dest(dir));
}

export function buildTs({ modules }) {
  const componentDir = getComponentDir();
  dir = (modules === false) ? esDir : libDir;

  const source = [
    `${componentDir}/**/*.tsx`,
    `${componentDir}/**/*.ts`,
    'typings/**/*.d.ts'
  ];
  let error = 0;

  if (tsConfig.allowJs) {
    source.unshift( `${componentDir}/**/*.jsx`);
  }

  const tsResult = gulp.src(source)
    .pipe(typescript(tsConfig));

  function check() {
    if (error && !argv['ignore-error']) {
      process.exit(1);
    }
  }

  tsResult.on('finish', check);
  tsResult.on('end', check);

  const tsFilesStream = babelify(tsResult.js, modules);
  // 生成*.d.ts
  const tsd = tsResult.dts.pipe(gulp.dest(dir));

  return merge2([tsFilesStream, tsd]);
}
