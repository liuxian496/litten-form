import {
    LittenObjectValue,
    LittenValue,
    UserControlProps,
} from "litten-hooks/dist/control/userControl/userControl.types";
import { ReactNode } from "react";

export interface FormProps extends UserControlProps {
    /**
     * 设置Form的引用对象
     */
    formRef: FormRef;
    /**
     * 子组件
     */
    children?: ReactNode;
}

/**
 * 表单数据
 */
export interface FormValues {
    [index: string]: FormItemValue;
}

/**
 * 表单注册器
 */
export interface FormRegister {
    [index: string]: {
        get?: () => FormItemValue | undefined;
        set?: React.Dispatch<React.SetStateAction<FormItemValue>> | undefined;
    };
}

export interface FormRef {
    /**
     * 获取表单当前数据
     * @returns 表单数据
     */
    getValues: () => FormValues;
    /**
     * 设置表单的值
     * @returns void
     */
    setValues: (values: FormValues) => void;
    /**
     * 设置表单项数据
     * @returns void
     */
    clear: () => void;
    /**
     * 通过属性路径，获取表单项对应控件的值
     * @returns void
     */
    getValueByPath: (path: string) => FormItemValue;
    /**
     * 通过属性路径，设置FormControl对应的控件的value
     * @param path 用于获取value属性的属性路径
     * @returns void
     */
    setValueByPath: (path: string, value: FormItemValue) => void;
    /**
     * 注册formRegister
     */
    _setFormRegister?: React.Dispatch<FormRegister>;
}

export interface FormContextProps {
    register: (props: FormItemRegister) => void;
    checkValuePath: (path: string) => void;
    uninstall: (path: string) => void;
}

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
 * 表单项数据
 */
export type FormItemValue = LittenValue | LittenObjectValue;

/**
 * 表单项注册器
 */
export interface FormItemRegister {
    path: string;
    get: () => FormItemValue;
    set: React.Dispatch<React.SetStateAction<FormItemValue>>;
}