import { camelCase, upperFirst, kebabCase } from 'lodash';
import getConfig from '../utils/getConfig';

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
  const { componentDir } = getConfig();
  console.log(componentDir);
  console.log(getComponentName(name));
  console.log(getComponentFileName(name));
}

export default main;
