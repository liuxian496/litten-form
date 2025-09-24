import { ChangeEvent } from 'react';

import { LittenEvent } from 'litten-hooks/dist/control/event/littenEvent.types';
import { Checkbox } from 'litten/dist/checkbox';
import { CheckboxProps } from 'litten/dist/components/checkbox/checkbox.types';

import { FormItemProps } from '../../components/form/form.types';
import { useFormItemValue } from '../../components/form/useFormItemValue';
import { ValidationType } from '../validation';

interface CheckboxFormItemProps
  extends FormItemProps<boolean, ValidationType>,
    CheckboxProps {}

export const CheckboxFormItem = ({
  path,
  initialValue,
  onChange,
  ...props
}: CheckboxFormItemProps) => {
  const [value, setValue] = useFormItemValue<boolean>(path, initialValue);

  function handleChange(e: LittenEvent<ChangeEvent<HTMLInputElement>, string>) {
    setValue(e.checked === true);
    onChange?.(e);
  }

  function render() {
    return (
      <div>
        <Checkbox {...props} checked={value} onChange={handleChange} />
      </div>
    );
  }

  return render();
};
