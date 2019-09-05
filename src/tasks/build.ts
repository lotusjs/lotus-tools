import * as merge2 from 'merge2';
import * as rimraf from 'rimraf';
import { buildLess } from './less';
import { copyAssets } from './assets';
import { buildTs } from './typescript';
import { getDirPath } from '../utils/utils';
import debug from '../debug';

const esDir = getDirPath('es');
const libDir = getDirPath('lib');

export function build(modules?: boolean) {
  const dir = modules === false ? esDir : libDir;

  const taskName = process.env.TASK_NAME;

  if (taskName !== 'start') {
    debug.log(`rm build ${modules === false ? 'es' : 'lib'} dir`);
    // 删除输出目录
    rimraf.sync(dir);
  }

  return merge2([
    buildLess(dir),
    copyAssets(dir),
    buildTs({
      modules
    })
  ])
}
