import type { ChangeEvent } from 'react';
import { useFormItemValue } from '../../../components/form/useFormItemValue';
import type { NativeCheckboxProps } from './littenCheckbox.type';

export const NativeCheckbox = ({
  initialValue = false,
  label,
  path,
  onChange,
  ...props
}: NativeCheckboxProps) => {
  const [value, setValue] = useFormItemValue<boolean>(path, initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setValue(e.target.checked === true);
    onChange?.(e);
  }

  function render() {
    return (
      <div>
        <label>
          <span style={{ display: 'inline-block' }}>{label}</span>
          <input
            {...props}
            type="checkbox"
            checked={value}
            onChange={handleChange}
          />
        </label>
      </div>
    );
  }

  return render();
};
