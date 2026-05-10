import type { ChangeEvent, FocusEvent } from 'react';

import { TextField } from 'litten/dist/textField';

import { ControlType, getDefaultValueByDisplayName } from 'litten-hooks';
import type {
  LittenEvent,
  TextFieldValue,
} from 'litten-hooks/dist/control/event/littenEvent.types';

import { type FormHelperInfo } from '../../../components/form/form.types';
import { useFormItemValue } from '../../../components/form/useFormItemValue';
import { useHelperInfo } from '../../../components/form/useHelperInfo';
import type { ValidationType } from '../../form/validation';
import type { LittenTextFieldProps } from './littenTextField.types';

export const LittenTextField = ({
  path,
  initialValue,
  validations = [],
  onBlur,
  onChange,
  ...props
}: LittenTextFieldProps) => {
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
        <div
          style={{ color: '#d32f2f', fontStyle: 'italic', fontSize: '0.88rem' }}
        >
          {currentHelperText}
        </div>
      </div>
    );
  }

  return render();
};
