import { resolve } from 'path';
import { LoadResult } from 'joycon';
import configLoader from './config-loader';
import { IOptions } from '../interface';

/**
 * 获取用户配置
 * @param cwd 用户的执行目录
 */
const getUserConfig = (cwd?: string): IOptions => {
  cwd = cwd || process.cwd();

  const userConfig: LoadResult = configLoader.loadSync({
    files: [
      'lotus-tools.config.js',
      'lotus-tools.config.ts'
    ],
    cwd
  });

  return userConfig.data || {};
};

/**
 * 获取配置
 * @param cwd
 */
const getConfig = (cwd?: string) => {
  cwd = cwd || process.cwd();

  // 用户配置
  const userConfig = getUserConfig(cwd) || {};
  userConfig.libraryDir = resolve(cwd, userConfig.libraryDir as string);

  // 默认配置
  const defaultConfig: IOptions = {
    libraryDir: resolve(cwd, 'components')
  };

  return Object.assign({}, defaultConfig, userConfig);
};

export default getConfig;
