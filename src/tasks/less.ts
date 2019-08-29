import * as gulp from 'gulp';
import * as through2 from 'through2';
import {
  getComponentDir,
  getProjectPath
} from '../utils/utils';
import transformLess from '../transforms/less';

const esDir = getProjectPath('es');

export function buildLess() {
  const componentDir = getComponentDir();

  return gulp.src([`${componentDir}/**/*.less`])
    .pipe(through2.obj(function(file, encoding, next) {
      this.push(file.clone());
      transformLess(file.path)
        .then(css => {
          file.contents = Buffer.from(css);
          file.path = file.path.replace(/\.less$/, '.css');
          this.push(file);
          next();
        })
        .catch(e => {
          console.error(e);
        });
    }))
    .pipe(gulp.dest(esDir));
}
