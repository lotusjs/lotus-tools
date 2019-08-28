import * as gulp from 'gulp';
import { buildLess } from './tasks';

const less = require('gulp-less');

gulp.task('less', buildLess);
