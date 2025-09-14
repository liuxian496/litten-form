import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

import { FormArgs, FormItemValue, FormProps, FormRegister } from './form.types';

import { ExceptionBoundary } from 'exception-boundary';
import { ControlType } from 'litten-hooks/dist/enum';
import { getVisualStates } from './formBase';
import { FormContext, initContext } from './context';
import {
  getValueByPath,
  getValues,
  setHelpTextByPath,
  setValueByPath,
  setValues,
} from './formUtil';
import { validate } from '../validation';

/**
 * Form 是一个 React 组件，提供基于React Context的表单管理系统
 * 通过 `ref` 暴露命令式方法，用于操作表单状态，如清空、获取、设置和校验表单值。
 *
 * @param {FormProps} props - 表单组件的属性
 * @param {React.Ref<FormRef>} ref - 用于访问命令式表单方法的 ref
 * @returns {JSX.Element} 渲染后的表单组件
 */
export const Form = forwardRef(
  ({ children, prefixCls, ...props }: FormProps, ref) => {
    const [formRegister] = useState<FormRegister>({});

    const [errorMsg, setErrorMsg] = useState<undefined | string>();

    const [context, setContext] = useState(
      initContext(formRegister, setErrorMsg)
    );

    useEffect(() => {
      setContext(initContext(formRegister, setErrorMsg));
    }, [formRegister]);

    useImperativeHandle(ref, () => {
      return {
        clear: () => {
          Object.keys(formRegister).forEach((key) => {
            formRegister[key]?.set?.(undefined);
          });
        },
        getValues: () => {
          return getValues(formRegister);
        },
        getValueByPath: (path: string) => {
          return getValueByPath(path, formRegister);
        },
        setHelpTextByPath: (
          path: string,
          helperText: string | JSX.Element | undefined
        ) => {
          setHelpTextByPath(path, helperText, formRegister);
        },
        setValues: (args: FormArgs) => {
          return setValues(args, formRegister);
        },
        setValueByPath: (path: string, value: FormItemValue) => {
          setValueByPath(path, value, formRegister);
        },
        validate: () => {
          return validate(formRegister);
        },
      };
    }, [formRegister]);

    return (
      <ExceptionBoundary errorMsg={errorMsg}>
        <FormContext.Provider value={context}>
          <div className={getVisualStates(prefixCls)} {...props}>
            {children}
          </div>
        </FormContext.Provider>
      </ExceptionBoundary>
    );
  }
);

Form.displayName = ControlType.Form;
