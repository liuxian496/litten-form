import {
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

import { FormContext } from './context';
import type { FormHelperInfo } from './form.types';

/**
 *  提供一个自定义hook, 用来实现表单项的受控逻辑
 *
 * @template T - 表单项值的类型，默认FormItemValue
 * @template V - 传递给校验函数的值类型，默认string
 *
 * @param valuePath - 唯一标识表单项的路径
 * @param initialValue - 表单项的初始值
 * @param onGetErrorMessage - 可选，校验值并返回错误信息或 JSX 元素的函数
 * @param setHelperText - 可选，用于设置校验提示文本的 setter
 *
 * @returns 包含当前值和用于更新值的 setter 的元组
 */
export function useFormItemValue<T, V = string>(
  valuePath: string,
  initialValue?: T,
  onGetErrorMessage?: (value: V) => FormHelperInfo | undefined,
  setHelperText?: Dispatch<SetStateAction<FormHelperInfo | undefined>>
) {
  const formContext = useContext(FormContext);

  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    formContext?.checkValuePath(valuePath);
    return () => {
      formContext?.uninstall(valuePath);
    };
  }, [formContext, valuePath]);

  useEffect(() => {
    formContext?.register({
      path: valuePath,
      get: <T>() => {
        return value as T | undefined;
      },
      set: setValue as <T>(value: T) => void,
      validate: <T>(newValue: T) =>
        onGetErrorMessage?.(newValue as unknown as V),
      setHelperText: setHelperText,
    });
  }, [formContext, onGetErrorMessage, value, valuePath, setHelperText]);

  return [value as T, setValue] as [T, Dispatch<SetStateAction<T>>];
}
