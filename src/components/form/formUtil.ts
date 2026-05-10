import { warn } from '../util';
import {
  setMethodNotFound,
  setValuesFirstParamNotArray,
  valuePathNotFoundEntry,
} from './entries';
import type {
  FormArgs,
  FormHelperInfo,
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
  helperText: FormHelperInfo,
  formRegister: FormRegister
) {
  const formItemRegister = formRegister[path];

  if (formItemRegister !== undefined) {
    formItemRegister.setHelperText?.(helperText);
  } else {
    warn(valuePathNotFoundEntry(path));
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
      } else {
        warn(setMethodNotFound());
      }
    });
  } else {
    warn(setValuesFirstParamNotArray());
  }
}

/**
 * 通过属性路径设置指定表单项的值，并自动触发该表单项的验证逻辑。
 *
 * @param path 表单项的唯一路径（valuePath）
 * @param value 需要设置的新值
 * @param formRegister 当前表单的注册器对象
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
    } else {
      warn(setMethodNotFound());
    }
  } else {
    warn(valuePathNotFoundEntry(path));
  }
}
