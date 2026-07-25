import { type Dispatch, type SetStateAction, useState } from 'react';

import { formInjector } from '../inject';
import { warn } from '../util';

import { commonValidationAssertNotFound } from './entries';
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

  function verifyFormItem(value: V): FormHelperInfo {
    let result: FormHelperInfo;
    let invalid = false;
    const max = validations.length;

    for (let i = 0; i < max; i++) {
      const { helpInfo: info, type, validationAssert } = validations[i];

      if (type === BaseValidationType.Customize) {
        if (validationAssert !== undefined) {
          invalid = validationAssert(value) === false;
        } else {
          warn('validationAssert is Undefined');
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
