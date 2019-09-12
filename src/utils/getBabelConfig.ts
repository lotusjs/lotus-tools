import { resolve } from './utils';
import configLoader from './config-loader';

/**
 * 获取用户Babel配置
 * @param cwd 用户的执行目录
 */
const getUserBabelConfig = (cwd?: string) => {
  cwd = cwd || process.cwd();

  const babelConfig = configLoader.loadSync({
    files: [
      'babel.config.js',
      'babel.config.ts'
    ],
    cwd
  });

  return babelConfig.data || {};
};

export default function (modules: boolean) {
  const { plugins = [] } = getUserBabelConfig();

  return {
    presets: [
      resolve('@babel/preset-react'),
      [
        resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4'
            ]
          }
        }
      ]
    ],
    plugins: [
      [
        resolve('@babel/plugin-transform-typescript'),
        {
          isTSX: true,
        }
      ],
      resolve('babel-plugin-inline-import-data-uri'),
      resolve('@babel/plugin-transform-member-expression-literals'),
      resolve('@babel/plugin-transform-object-assign'),
      resolve('@babel/plugin-transform-property-literals'),
      [
        resolve('@babel/plugin-transform-runtime'),
        {
          helpers: false
        }
      ],
      resolve('@babel/plugin-transform-spread'),
      resolve('@babel/plugin-transform-template-literals'),
      resolve('@babel/plugin-proposal-export-default-from'),
      resolve('@babel/plugin-proposal-export-namespace-from'),
      resolve('@babel/plugin-proposal-object-rest-spread'),
      [
        resolve('@babel/plugin-proposal-decorators'),
        {
          legacy: true
        }
      ],
      resolve('@babel/plugin-proposal-class-properties'),
      [
        resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          style: true
        }
      ],
      ...plugins
    ]
  };
}
