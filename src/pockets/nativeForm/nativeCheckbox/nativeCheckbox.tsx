import { useRef, type ChangeEvent } from 'react';

import { useFormItemValue } from '../../../components/form/useFormItemValue';

import type { NativeCheckboxProps } from './littenCheckbox.types';

export const NativeCheckbox = ({
  initialValue = false,
  label,
  path,
  onChange,
  ...props
}: NativeCheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useFormItemValue<boolean>(
    path,
    initialValue,
    undefined,
    undefined,
    inputRef
  );

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
            ref={inputRef}
          />
        </label>
      </div>
    );
  }

  return render();
};
