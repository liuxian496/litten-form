import { useEffect, useState } from "react";
import { FormItemValue, FormRef, FormRegister, FormValues } from "./form.types";

/**
 * 输出控制台警告信息
 * @param msg 警告信息
 */
export function warn(msg: string) {
    console.warn(`[litten warning]: ${msg}`);
}

function getValues(formRegister: FormRegister) {
    const value: FormValues = {};
    Object.keys(formRegister).forEach((key) => {
        const get = formRegister[key].get;
        if (get) {
            value[key] = get();
        }
    });

    return value;
}

function setValues(values: FormValues, formRegister: FormRegister) {
    Object.keys(formRegister).forEach((key) => {
        const set = formRegister[key].set;
        set && set(values[key]);
    });
}

function getValueByPath(path: string, formRegister: FormRegister) {
    const current = formRegister[path];
    let value;
    if (current !== undefined) {
        const get = current.get;
        if (get) {
            value = get();
        }
    } else {
        value = undefined;
    }

    return value;
}

function setValueByPath(
    path: string,
    value: FormItemValue,
    formRegister: FormRegister
) {
    const current = formRegister[path];
    if (current !== undefined) {
        const set = current.set;
        set && set(value);
    } else {
        warn(`The valuePath "${path}" does not exist.`);
    }
}

export function useForm() {
    const [formRegister, setFormRegister] = useState<FormRegister>();

    const [form, setForm] = useState<FormRef>({
        getValues: () => ({}) as FormValues,
        setValues: () => {},
        clear: () => {},
        getValueByPath: () => undefined,
        setValueByPath: () => {},
        _setFormRegister: setFormRegister,
    });

    useEffect(() => {
        return () => {
            setFormRegister({});
        };
    }, []);

    useEffect(() => {
        if (formRegister !== undefined) {
            setForm({
                getValues: () => {
                    return getValues(formRegister);
                },
                setValues: (values: FormValues) => {
                    return setValues(values, formRegister);
                },

                clear: () => {
                    setValues({}, formRegister);
                },
                getValueByPath: (path: string) => {
                    return getValueByPath(path, formRegister);
                },
                setValueByPath: (path: string, value: FormItemValue) => {
                    setValueByPath(path, value, formRegister);
                },
            });
        }
    }, [formRegister]);

    return form;
}
