import classnames from 'classnames';
import { getPrefixNs as cyndiPrefixNs } from 'cyndi/dist/getPrefixNs';

/**
 * 包含表单组件基础校验类型的对象。
 *
 * @property {string} Customize - 表示自定义校验类型。
 */
export const BaseValidation = {
  /**
   * 表示自定义校验类型
   */
  Customize: 'customize',
} as const;

/**
 * 获取组件的css类名
 * @param componentName - 组件名称
 * @param customizePrefix - 自定义前缀
 * @returns 组件的css类名
 */
function getPrefixNs(componentName: string, customizePrefix?: string): string {
  return cyndiPrefixNs(componentName, customizePrefix, 'litten');
}

export function getVisualStates(cls?: string) {
  const prefixCls = getPrefixNs('form', cls);

  const visualStates = classnames(prefixCls);

  return visualStates;
}
