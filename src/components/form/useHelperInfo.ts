import { Dispatch, SetStateAction, useState } from 'react';
import { formInjector } from '../inject';
import { FormItemValidation, FormItemValue } from './form.types';
import { BaseValidation } from './formBase';

/**
 * 提供一个自定义hook，管理表单项的帮助信息
 *
 * @template T - 帮助信息的类型，默认为 `FormHelperInfo`
 * @template VT - 验证类型，默认为 `ValidationType`
 * @template V - 需要校验的值类型，默认为 `string`
 * @param validations - 需要应用于值的校验规则数组。
 * @returns 返回一个元组，包含：
 *   - 帮助信息 (`T`),
 *   - 校验并更新帮助信息的函数 (`(value: V) => T`),
 *   - 更新帮助信息状态的set函数 (`Dispatch<SetStateAction<T | undefined>>`)。
 */
export function useHelperInfo<T, V, VT>(
  validations: FormItemValidation<VT>[] = []
) {
  const [currentHelperText, setCurrentHelperText] = useState<T>();

  function verifyFormItem(value: V) {
    let result: T | undefined;
    const max = validations.length;

    for (let i = 0; i < max; i++) {
      const { helpInfo, type, validationAssert } = validations[i];

      if (type === BaseValidation.Customize) {
        result =
          validationAssert?.(value as FormItemValue) === false
            ? (helpInfo as T)
            : undefined;
      }

      if (formInjector.extendVerifyFormItem) {
        result =
          formInjector.extendVerifyFormItem(value as FormItemValue, type) ===
          false
            ? (helpInfo as T)
            : undefined;
      }

      if (result !== undefined) {
        break;
      }
    }

    setCurrentHelperText(result);

    return result;
  }

  return [currentHelperText, verifyFormItem, setCurrentHelperText] as [
    T,
    (value: V) => T | undefined,
    Dispatch<SetStateAction<T | undefined>>,
  ];
}
