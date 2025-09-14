import React, { FocusEvent, ChangeEvent } from 'react';

import { TextField } from 'litten/dist/textField';
import { useFormItemValue } from './useFormItemValue';
import { FormHelperInfo, FormItemProps } from './form.types';
import {
  LittenEvent,
  TextFieldValue,
} from 'litten-hooks/dist/control/event/littenEvent.types';
import { TextFieldProps } from 'litten/dist/components/textField/textField.types';
import { ControlType, getDefaultValueByDisplayName } from 'litten-hooks';
import { useHelperInfo } from './useHelperInfo';
import { BaseValidation } from './formBase';

export const Validation = {
  ...BaseValidation,
  StringRequired: 'stringRequired',
} as const;

export type ValidationType = (typeof Validation)[keyof typeof Validation];

interface TextFieldFormItemProps
  extends FormItemProps<ValidationType>,
    Omit<TextFieldProps, 'onBlur'> {
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
    validationResult: FormHelperInfo
  ) => void;
}

export const TextFieldFormItem = ({
  path,
  initialValue,
  validations = [],
  onBlur,
  onChange,
  ...props
}: TextFieldFormItemProps) => {
  const [currentHelperText, verifyFormItem, setCurrentHelperText] =
    useHelperInfo<FormHelperInfo, string, ValidationType>(validations);

  const [value, setValue] = useFormItemValue<TextFieldValue>(
    path,
    initialValue,
    verifyFormItem,
    setCurrentHelperText
  );

  function handleChange(
    e: LittenEvent<ChangeEvent<HTMLInputElement>, TextFieldValue>
  ) {
    setValue(e.value);
    onChange?.(e);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const result = verifyFormItem(value as string);
    onBlur?.(e, result);
  }

  function render() {
    return (
      <div>
        <TextField
          {...props}
          value={value}
          defaultValue={getDefaultValueByDisplayName(ControlType.TextField)}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div>{currentHelperText}</div>
      </div>
    );
  }

  return render();
};
