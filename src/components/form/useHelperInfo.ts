import { type Dispatch, type SetStateAction, useState } from 'react';

import { formInjector } from '../inject';
import { warn } from '../util';

import {
  commonValidationAssertNotFound,
  validationAssertNotFoundEntry,
} from './entries';
import type { FormHelperInfo, FormItemValidation } from './form.types';
import { BaseValidationType } from './form.types';

/**
 * 提供一个自定义hook，管理表单项的帮助信息
 *
 * @template T - 帮助信息的类型，默认为 `FormHelperInfo`
 * @template VT - 验证类型，默认为 `ValidationType`
 * @template V - 需要校验的值类型，默认为 `string`
 * @param validations - 需要应用于值的校验规则数组。
 * @returns 返回一个元组，包含：
 *   - 校验并更新帮助信息的函数 (`(value: V) => T`),
 *   - 更新帮助信息状态的set函数 (`Dispatch<SetStateAction<FormHelperInfo>>`)。
 */
export function useHelperInfo<V, VT>(validations: FormItemValidation<VT>[]) {
  const [currentHelperText, setCurrentHelperText] = useState<FormHelperInfo>();

  /**
   * 对表单项的值进行逐项校验，并返回第一个失败的校验对应的帮助信息。
   * 同时将帮助信息同步到内部状态 `currentHelperText`。
   *
   * @param value - 待校验的值
   * @param path  - 表单项路径（用于错误日志定位）
   * @returns 如果校验失败，返回帮助信息（FormHelperInfo）；全部通过则返回 undefined。
   */
  function verifyFormItem(value: V, path: string): FormHelperInfo {
    let result: FormHelperInfo;
    let invalid = false;
    const max = validations.length;

    for (let i = 0; i < max; i++) {
      const { helpInfo: info, type, validationAssert } = validations[i];

      if (type === BaseValidationType.Customize) {
        if (validationAssert !== undefined) {
          invalid = validationAssert(value) === false;
        } else {
          warn(validationAssertNotFoundEntry(path));
          break;
        }
      } else if (formInjector.commonValidationAssert) {
        invalid = formInjector.commonValidationAssert(value, type) === false;
      } else {
        // 没有提供通用的验证断言函数，无法进行验证，发出警告
        warn(commonValidationAssertNotFound());
        break;
      }

      if (invalid) {
        // 优先使用验证规则中提供的帮助信息，如果没有，则尝试从 formInjector 获取默认帮助信息
        const helpInfo =
          info ??
          (formInjector.getDefaultHelperInfo
            ? formInjector.getDefaultHelperInfo(type)
            : undefined);

        result = helpInfo;
        break;
      }
    }

    setCurrentHelperText(result);

    return result;
  }

  return [currentHelperText, verifyFormItem, setCurrentHelperText] as [
    FormHelperInfo,
    (value: V) => FormHelperInfo,
    Dispatch<SetStateAction<FormHelperInfo>>,
  ];
}
