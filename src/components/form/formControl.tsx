import React, {
    Children,
    cloneElement,
    useContext,
    useEffect,
    useState,
} from "react";

import { ControlType } from "litten-hooks/dist/enum";
import { getDefaultValueByDisplayName } from "litten-hooks/dist/contentControl";
import { ContentControlProps } from "litten-hooks/dist/control/contentControl/contentControl.types";
import {
    LittenCheckedChangeEvent,
    LittenContentChangeEvent,
} from "litten-hooks/dist/control/event/littenEvent.types";

import { FormControlProps, FormItemValue } from "./form.types";
import { FormContext } from "./context";


export const FormControl = (props: FormControlProps) => {
    const { children, valuePath } = props;

    const contentControl = Children.only(children);

    const { type: Component, props: childrenProps } = children;

    const { displayName } = Component;

    const {
        onChange,
        defaultValue = getDefaultValueByDisplayName(displayName),
    } = childrenProps as ContentControlProps;

    const [value, setValue] = useState<FormItemValue>();

    const formContext = useContext(FormContext);

    useEffect(() => {
        // 检测value path是否重复,并注册
        formContext?.checkValuePath(valuePath);
        return () => {
            formContext?.uninstall(valuePath);
        };
    }, [formContext, valuePath]);

    useEffect(() => {
        formContext?.register({
            get: () => {
                return value;
            },
            set: setValue,
            path: valuePath,
        });
    }, [formContext, value, valuePath]);

    function handleValueChange(event: LittenContentChangeEvent) {
        const { value } = event;

        onChange?.(event);
        setValue(value);
    }

    function handleCheckedChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;

        onChange?.(event);
        setValue(checked);
    }

    function renderCheckedControl() {
        return cloneElement(contentControl, {
            checked: value,
            onChange: handleCheckedChange,
        });
    }

    function renderContentControl() {
        return cloneElement(contentControl, {
            value,
            defaultValue,
            onChange: handleValueChange,
        });
    }

    return (
        <>
            {displayName === ControlType.Checkbox ||
            displayName === ControlType.Switch
                ? renderCheckedControl()
                : renderContentControl()}
        </>
    );
};

FormControl.displayName = ControlType.FormControl;
