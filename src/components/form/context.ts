import { createContext } from "react";
import { FormContextProps, FormItemRegister, FormRegister } from "./form.types";

export const FormContext = createContext<FormContextProps | undefined>(
    undefined
);

export function initContext(
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
                setErrorMsg(`The valuePath "${path}" is used by other FormControl, Please check your form.`);
            }
        },
    };
}