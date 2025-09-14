import { warn } from '../util';
import {
  FormArgs,
  FormItemValue,
  FormRegister,
  FormValues,
} from './form.types';

/**
 * 获取表单当前数据
 * @param {FormRegister} formRegister 表单注册器
 * @returns 表单当前数据对象
 */
export function getValues(formRegister: FormRegister) {
  const value: FormValues = {};
  Object.keys(formRegister).forEach((key) => {
    const get = formRegister[key]?.get;
    if (get) {
      value[key] = get();
    }
  });

  return value;
}

/**
 * 通过属性路径获取表单项对应控件的值的方法
 * @param path 表单项的值在表单数据中的属性路径
 * @param {FormRegister} formRegister 表单注册器
 * @returns 表单项对应控件的值
 */
export function getValueByPath(path: string, formRegister: FormRegister) {
  const formItemRegister = formRegister[path];
  let value;
  if (formItemRegister !== undefined) {
    const get = formItemRegister.get;
    if (get) {
      value = get();
    }
  } else {
    value = undefined;
  }

  return value;
}

/**
 * 设置表单项的帮助信息
 * @param path 表单项的值在表单数据中的属性路径
 * @param helperText 帮助信息
 * @param formRegister 表单注册器
 */
export function setHelpTextByPath(
  path: string,
  helperText: string | JSX.Element | undefined,
  formRegister: FormRegister
) {
  const formItemRegister = formRegister[path];

  if (formItemRegister !== undefined) {
    formItemRegister.setHelperText?.(helperText);
  } else {
    warn(
      `Can not find the valuePath "${path}" in form. Please check if the form item is registered.`
    );
  }
}

/**
 * 设置表单数据
 * @param {FormArgs} args 表单项参数数组
 * @param {FormRegister} formRegister 表单注册器
 */
export function setValues(args: FormArgs, formRegister: FormRegister) {
  if (Array.isArray(args)) {
    args.forEach((args) => {
      const { path, value } = args;
      const set = formRegister[path]?.set;
      const validate = formRegister[path]?.validate;
      if (set) {
        set(value);
        validate?.(value);
      }
    });
  }
}

/**
 * 通过属性路径设置表单项对应控件的值的方法
 * @param path 表单项的值在表单数据中的属性路径
 * @param value 表单项对应控件的值
 * @param {FormRegister} formRegister 表单注册器
 */
export function setValueByPath(
  path: string,
  value: FormItemValue,
  formRegister: FormRegister
) {
  const formItemRegister = formRegister[path];
  if (formItemRegister !== undefined) {
    const { set, validate } = formItemRegister;

    if (set) {
      set(value);
      validate?.(value);
    }
  } else {
    warn(
      `Can not find the valuePath "${path}" in form. Please check if the form item is registered.`
    );
  }
}
