import React, {
    useEffect,
    useState,
} from "react";

import {
    FormProps,
    FormRegister,
} from "./form.types";

import { ExceptionBoundary } from "exception-boundary";
import { ControlType } from "litten-hooks/dist/enum";
import { getVisualStates } from "./formBase";
import { FormContext, initContext } from "./context";

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
