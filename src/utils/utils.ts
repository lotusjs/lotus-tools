import { join } from 'path';
import getConfig from './getConfig';
import debug from '../debug';

export function resolve(moduleName) {
  return require.resolve(moduleName);
}

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
  return join(process.cwd(), ...filePath);
}

/**
 * 获取相对于组件目录的路径
 * @param filePath
 */
export function getDirPath(...filePath) {
  const libraryDir = getConfig().libraryDir as string;
  return join(libraryDir, '../', ...filePath);
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

export function cleanArgs(cmd): {
  [key: string]: any
} {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  });
  return args;
}
