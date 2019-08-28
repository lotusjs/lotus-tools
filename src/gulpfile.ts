import * as gulp from 'gulp';
import { getProjectPath } from './utils/utils';

const less = require('gulp-less');

gulp.task('less', () => {
  return gulp.src([`examples/**/*.less`])
    .pipe(less())
    .pipe(gulp.dest(getProjectPath('es')));
});
