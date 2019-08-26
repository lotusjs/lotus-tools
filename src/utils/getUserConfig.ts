import { LoadResult } from 'joycon';
import configLoader from './config-loader'

const getUserConfig = (cwd) => {
  const userConfig: LoadResult = configLoader.loadSync({
    files: [
      'lotus-tools.config.js',
      'lotus-tools.config.ts'
    ],
    cwd
  });

  return userConfig.data || {};
};

export default getUserConfig;
