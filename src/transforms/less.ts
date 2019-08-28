import { resolve, dirname } from 'path';
import { readFileSync } from 'fs';
import * as postCss from 'postcss';
import * as less from 'less';
import postCssConfig from './postcss-config';

export interface IOptions {
  cwd?: string;
}

const NpmImportPlugin = require('less-plugin-npm-import');

function transformLess(
  lessFile: string,
  options?: IOptions
) {
  const { cwd = process.cwd() } = options || {};
  const resolvedLessFile = resolve(cwd, lessFile);

  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');

  const lessOpts = {
    paths: [dirname(resolvedLessFile)],
    filename: resolvedLessFile,
    plugins: [new NpmImportPlugin({ prefix: '~' })],
    javascriptEnabled: true,
  };

  return less
    .render(data, lessOpts)
    .then(result => postCss(postCssConfig.plugins).process(result.css, { from: undefined }))
    .then(r => r.css);
}

export default transformLess;
