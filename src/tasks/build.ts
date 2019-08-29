import * as merge2 from 'merge2';
import * as rimraf from 'rimraf';
import { buildLess } from './less';
import { copyAssets } from './assets';
import { buildTs } from './typescript';
import { getDirPath } from '../utils/utils';

const esDir = getDirPath('es');
const libDir = getDirPath('lib');

export function build(modules?: boolean) {
  const dir = modules === false ? esDir : libDir;

  // 删除输出目录
  rimraf.sync(dir);

  return merge2([
    buildLess(dir),
    copyAssets(dir),
    buildTs({
      modules
    })
  ])
}
