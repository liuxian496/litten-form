import type { InputHTMLAttributes } from 'react';

import type { FormItemProps, ValidationType } from '@/pockets/form';

export interface NativeCheckboxProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    FormItemProps<boolean, ValidationType> {
  label?: string;
  'data-testid'?: string;
}
