import * as merge2 from 'merge2';
import { buildLess } from './less';
import { copyAssets } from './assets';
import { getProjectPath } from '../utils/utils';

export type IType  = 'es' | 'lib';

const esDir = getProjectPath('es');
const libDir = getProjectPath('lib');

export function build(type: IType) {
  const dir = type === 'es' ? esDir : libDir;

  return merge2([
    buildLess(dir),
    copyAssets(dir)
  ])
}
