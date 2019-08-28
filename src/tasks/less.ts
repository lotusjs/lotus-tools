import { src } from 'gulp';
import through2 from 'through2';
import { getComponentDir } from '../utils/utils';
import transformLess from '../transforms/less';

export function buildLess() {
  const componentDir = getComponentDir();
  console.log(componentDir);

  return src([`${componentDir}/**/*.less`])
    .pipe(through2.obj(function (file, encoding, next) {
      console.log(file.path);
      transformLess(file.path).then(css => {
        console.log(css);
      })
    }));
}
