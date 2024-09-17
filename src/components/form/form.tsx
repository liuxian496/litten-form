import React, {
    createContext,
    useEffect,
    useState,
} from "react";

import classnames from "classnames";

import {
    FormProps,
    FormContextProps,
    FormItemRegister,
    FormRegister,
} from "./form.types";

import { getPrefixNs as cyndiPrefixNs } from "cyndi/dist/getPrefixNs";

import { ExceptionBoundary } from "exception-boundary";
import { ControlType } from "litten-hooks/dist/enum";

function getPrefixNs(componentName: string, customizePrefix?: string): string {
    return cyndiPrefixNs(componentName, customizePrefix, "litten");
}

function getVisualStates(cls?: string) {
    const prefixCls = getPrefixNs("form", cls);

    const visualStates = classnames(prefixCls);

    return visualStates;
}

export const FormContext = createContext<FormContextProps | undefined>(
    undefined
);

const valuePathduplicate = (path: string) =>
    `The valuePath "${path}" is used by other FormControl, Please check your form.`;

function initContext(
    formRegister: FormRegister,
    setErrorMsg: React.Dispatch<React.SetStateAction<string | undefined>>
) {
    return {
        register: (props: FormItemRegister) => {
            const { path, get, set } = props;
            formRegister[path].get = get;
            formRegister[path].set = set;
        },
        uninstall: (path: string) => {
            delete formRegister[path];
        },
        checkValuePath: (path: string) => {
            if (
                Object.prototype.hasOwnProperty.call(formRegister, path) ===
                false
            ) {
                formRegister[path] = {};
            } else {
                setErrorMsg(valuePathduplicate(path));
            }
        },
    };
}

export const Form = ({ children, formRef, prefixCls, ...props }: FormProps) => {
    const [formRegister] = useState<FormRegister>({});

    const [errorMsg, setErrorMsg] = useState<undefined | string>();

    const [context, setContext] = useState(
        initContext(formRegister, setErrorMsg)
    );

    useEffect(() => {
        setContext(initContext(formRegister, setErrorMsg));
    }, [formRegister]);

    useEffect(() => {
        formRef._setFormRegister?.(formRegister);
        delete formRef["_setFormRegister"];
    }, [formRef, formRegister]);

    return (
        <ExceptionBoundary errorMsg={errorMsg}>
            <FormContext.Provider value={context}>
                <div className={getVisualStates(prefixCls)} {...props}>
                    {children}
                </div>
            </FormContext.Provider>
        </ExceptionBoundary>
    );
};

Form.displayName = ControlType.Form;
