import { type ChangeEvent } from 'react';
import { type FormHelperInfo } from '../../../components/form/form.types';
import { useFormItemValue } from '../../../components/form/useFormItemValue';
import { useHelperInfo } from '../../../components/form/useHelperInfo';
import type { ValidationType } from '../../form/validation';
import type { NativeTextFieldProps } from './nativeTextField.types';
import { getVisualStates, PartsVisualStates } from './nativeTextFieldBase';

import './nativeTextField.less';

export const NativeTextField = ({
  label,
  path,
  initialValue,
  validations = [],
  onChange,
  onBlur,
  ...props
}: NativeTextFieldProps) => {
  const [currentHelperText, verify, setCurrentHelperText] = useHelperInfo<
    FormHelperInfo,
    string,
    ValidationType
  >(validations);

  const [value, setValue] = useFormItemValue<string>(
    path,
    initialValue,
    verify,
    setCurrentHelperText
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onChange?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const result = verify(value as string);
    console.log('Validation result:', result);
    onBlur?.(e);
  }

  function renderHelpInfo() {
    return (
      <div className={PartsVisualStates.helpInfo}>{currentHelperText}</div>
    );
  }

  function render() {
    return (
      <div className={getVisualStates()}>
        <label>
          <div>{label}</div>
          <input
            {...props}
            type="text"
            value={value}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {renderHelpInfo()}
        </label>
      </div>
    );
  }

  return render();
};
