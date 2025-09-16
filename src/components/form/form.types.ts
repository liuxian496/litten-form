import {
  LittenObjectValue,
  LittenValue,
  UserControlProps,
} from 'litten-hooks/dist/control/userControl/userControl.types';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { BaseValidation } from './formBase';

/**
 * 表单组件属性
 * @property children - 表单组件的子组件
 * @property {ValidationMode} validationMode - 表单验证模式，支持分步验证或全部验证。默认全部验证（暂时只支持全部验证）
 */
export interface FormProps extends UserControlProps {
  /**
   * 表单组件的子组件
   */
  children?: ReactNode;
  /**
   * 表单验证模式，支持分步验证或全部验证。默认全部验证（暂时只支持全部验证）
   */
  validationMode?: ValidationMode;
}

/**
 * 表单项数据
 */
export type FormItemValue = LittenValue | LittenObjectValue;

/**
 * 表单项验证后的提示文字
 */
export type FormHelperInfo = string | JSX.Element | undefined;

/**
 * 表单项验证模式
 * @enum {string}
 */
export enum ValidationMode {
  /**
   * 分步验证
   */
  step = 'step',
  /**
   * 全部验证
   */
  all = 'all',
}

/**
 * 表单数据
 */
export interface FormValues {
  [index: string]: FormItemValue;
}

/**
 * 表单项注册器
 * @property path - 表单项的值路径，值路径需要唯一
 * @property get - 获取表单项值的方法
 * @property set - 设置表单项值的方法
 * @property validate - 可选的验证函数，接受表单项值作为参数，返回一个字符串或JSX元素表示验证结果
 * @property setHelperText - 可选的设置帮助信息的方法，接受一个字符串或JSX元素作为参数
 */
export interface FormItemRegister {
  path: string;
  get?: () => FormItemValue;
  set?: React.Dispatch<React.SetStateAction<FormItemValue>>;
  validate?: (value: FormItemValue) => FormHelperInfo;
  setHelperText?: Dispatch<SetStateAction<FormHelperInfo>>;
}

/**
 * 表单注册器
 * @property [index: string] - 以表单项的值路径作为键，值为对应的表单项注册器
 */
export interface FormRegister {
  [index: string]: FormItemRegister;
}

/**
 * 表单上下文属性
 * @property register - 注册表单项
 * @property checkValuePath - 检查指定路径的表单项值
 * @property uninstall - 卸载指定路径的表单项
 */
export interface FormContextProps {
  /**
   * 注册表单项
   * @param props 表单项注册器
   * @returns void
   */
  register: (props: FormItemRegister) => void;
  /**
   * 检查表单项的值路径是否唯一
   * @param path - 要校验的表单项的值路径
   */
  checkValuePath: (path: string) => void;
  /**
   * 卸载表单项
   * @param path - 要卸载的表单项的值路径
   * @returns void
   */
  uninstall: (path: string) => void;
}

/**
 * 表单控件属性
 */
export interface FormControlProps {
  /**
   * 设置用于获取value属性的属性路径
   */
  valuePath: string;
  /**
   * 子组件
   */
  children: JSX.Element;
}

/**
 * 表单项属性
 * @property path - 表单项的唯一路径
 * @property initialValue - 表单项的初始值, 不是默认值
 * @property validations - 表单项的验证规则
 */
export interface FormItemProps<T> {
  path: string;
  initialValue?: FormItemValue;
  validations?: FormItemValidations<T>;
}

/**
 * 表单项参数
 * 用于设置表单项的值
 * 包含属性路径和对应的值
 * @property path - 表单项的唯一路径
 * @property value - 表单项的值
 */
export interface FormItemArgs {
  path: string;
  value: FormItemValue;
}

/**
 * 表单参数
 * 包含一个数组，每个元素是一个[表单项参数](#FormItemArgs)
 */
export type FormArgs = FormItemArgs[];

/**
 * 表单默认验证类型
 */
export type BaseValidationType =
  (typeof BaseValidation)[keyof typeof BaseValidation];

/**
 * 扩展验证类型
 */
export interface ExtendedValidation {
  [key: string]: string;
}

/**
 * 表单项的验证对象
 * 包含帮助信息、验证类型和可选的验证断言函数，一个表单项可以包含多个验证对象
 * @property helpInfo - 帮助信息，可以是字符串或JSX元素
 * @property type - 验证类型，使用[ValidationType](#ValidationType)枚举
 * @property validationAssert - 可选的验证断言函数，接受表单项值作为参数，返回一个布尔值表示验证是否通过
 */
export interface FormItemValidation<T> {
  helpInfo: FormHelperInfo;
  type: T;
  validationAssert?: (value: FormItemValue) => boolean;
}

export type FormItemValidations<T> = FormItemValidation<T>[];

/**
 * 表单项帮助信息
 * @package helpInfo - 帮助信息，可以是字符串或JSX元素
 * @property path - 表单项的值路径
 */
export interface FormItemHelper {
  helpInfo: FormHelperInfo;
  path: string;
}

/**
 * 表单ref对象
 * 包含操作表单的方法
 * @property getValues - 获取表单当前数据的方法，返回一个包含所有表单项数据的对象
 * @property setValues - 设置表单数据的方法，接受一个包含表单项路径和值的数组作为参数
 * @property getValueByPath - 通过属性路径获取表单项对应控件的值的方法，接受一个字符串类型的路径作为参数，返回对应的值
 * @property setValueByPath - 通过属性路径设置表单项对应控件的值的方法，接受一个字符串类型的路径和一个值作为参数
 * @property setHelpTextByPath - 通过属性路径设置表单项的帮助信息的方法，接受一个字符串类型的路径和一个错误消息（字符串或JSX元素）作为参数
 * @property clear - 将所有表单项的值设置成undefined
 */
export interface FormRef {
  /**
   * 获取表单当前数据
   * @returns 表单当前数据对象
   */
  getValues: () => FormValues;
  /**
   * 设置表单数据
   * @param {FormArgs} args 表单项参数数组
   * @returns void
   * @example
   * ```ts
   * myForm.setValues([{ path: "name", value: "Tom" }, { path: "age", value: 18 }]);
   * ```
   */
  setValues: (args: FormArgs) => void;
  /**
   * 通过属性路径获取表单项对应控件的值的方法
   * @param path 表单项的值路径
   * @returns 表单项的值
   */
  getValueByPath: (path: string) => FormItemValue;
  /**
   * 通过属性路径设置表单项对应控件的值的方法
   * @param path 表单项的值路径
   * @param value 表单项对应控件的值
   * @returns void
   */
  setValueByPath: (path: string, value: FormItemValue) => void;
  /**
   * 通过属性路径设置表单项对应控件的帮助信息的方法
   * @param path 表单项的值路径
   * @param {FormHelperInfo} helpText 帮助信息
   * @returns void
   */
  setHelpTextByPath: (path: string, helpText: FormHelperInfo) => void;
  /**
   * 清空表单所有项的值
   * @returns void
   */
  clear: () => void;
  /**
   * 表单验证
   * @returns 表单验证结果数组
   */
  validate: () => FormItemHelper[];
}

export type VerifyFormItemFunction<V = FormItemValue, T = unknown> = (
  value: V,
  type: T
) => boolean;

export interface FormInjector {
  extendVerifyFormItem?: VerifyFormItemFunction;
}
