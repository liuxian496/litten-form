import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { FormContext } from './context';
import { FormItemValue } from './form.types';

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
export function useFormItemValue<T = FormItemValue, V = string>(
  valuePath: string,
  initialValue?: FormItemValue,
  onGetErrorMessage?:
    | ((value: V) => string | JSX.Element | undefined)
    | undefined,
  setHelperText?: Dispatch<SetStateAction<string | JSX.Element | undefined>>
) {
  const formContext = useContext(FormContext);

  const [value, setValue] = useState<FormItemValue>(initialValue);

  useEffect(() => {
    formContext?.checkValuePath(valuePath);
    return () => {
      formContext?.uninstall(valuePath);
    };
  }, [formContext, valuePath]);

  useEffect(() => {
    formContext?.register({
      path: valuePath,
      get: () => {
        return value;
      },
      set: setValue,
      validate: (newValue: FormItemValue) => onGetErrorMessage?.(newValue as V),
      setHelperText: setHelperText,
    });
  }, [formContext, onGetErrorMessage, value, valuePath, setHelperText]);

  return [value as T, setValue] as [T, Dispatch<SetStateAction<T>>];
}
