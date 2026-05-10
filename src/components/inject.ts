import type { FormInjector } from './form/form.types';

/**
 * 表单能力注入对象。
 * 目的是扩展Litten Form的能力，并将具体的功能实现解耦，使得Litten Form可以适配不同的组件库或者自定义的表单实现（比如验证）。
 */
export const formInjector: FormInjector = {};

/**
 * 为litten form注入一些定制能力。
 * @param args 注入实现集合，包含公共校验断言、默认帮助信息和初始值处理方法。
 */
export function initLittenForm<VT, CT, T>(args: FormInjector<VT, CT, T>) {
  const { commonValidationAssert, getDefaultHelperInfo, getInitialValue } =
    args;
  formInjector.commonValidationAssert = commonValidationAssert;
  formInjector.getDefaultHelperInfo = getDefaultHelperInfo;
  formInjector.getInitialValue = getInitialValue;
}
