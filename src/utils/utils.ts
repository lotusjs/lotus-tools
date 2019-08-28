import { join } from 'path';
import getConfig from './getConfig';
import debug from '../debug';

/**
 * 获取组件目录
 */
export function getComponentDir(): string {
  // 当前执行环境目录
  const cwd = process.cwd();
  // 组件绝对目录
  const libraryDir = getConfig().libraryDir as string;

  // 组件目录应与执行环境同级或其子集
  if (!(libraryDir).includes(cwd)) {
    debug.error('组件目录设置错误，请检查，只能执行环境的同级或子级目录');
    process.exit(1);
  }

  return libraryDir.replace(cwd, '').slice(1);
}

export function getProjectPath(...filePath) {
  const libraryDir = getConfig().libraryDir as string;
  return join(libraryDir, '../', ...filePath);
}
