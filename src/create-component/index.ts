import { resolve, join } from 'path';
import { template } from 'lodash';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { camelCase, upperFirst, kebabCase } from 'lodash';
import getConfig from '../utils/getConfig';
import debug from '../debug';

/**
 * 获取组件名称(转换组件名称为大驼峰)
 * @param name
 * @example
 * 'button-group' >> 'ButtonGroup'
 */
function getComponentName(name: string): string {
  return upperFirst(camelCase(name));
}

/**
 * 获取组件文件名称
 * @param name
 * @example
 * 'buttonGroup' >> 'button-group'
 */
function getComponentFileName(name: string): string {
  return kebabCase(name)
}

function addFiles() {

}

function main(
  name: string
) {
  const { libraryDir } = getConfig();
  const componentName = getComponentName(name);
  const componentFileName = getComponentFileName(name);


  const componentDir = resolve(libraryDir + '', componentFileName);

  // 组件目录是否存在
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir);
  } else {
    debug.error(`${componentName} already exists, please choose another name.`);
    process.exit(2);
  }

  // 生成组件文件
  const configTemplate = readFileSync(join(__dirname, './templates/component.ts.tpl'), 'utf-8');

  const compiled = template(configTemplate.toString());

  const componentFileText = compiled({
    name: componentName
  });

  writeFileSync(join(componentDir, `${componentFileName}.tsx`), componentFileText);
}

export default main;
