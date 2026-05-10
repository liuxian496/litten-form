import type { InputHTMLAttributes } from 'react';
import type { FormItemProps } from '../../../components/form/form.types';
import type { ValidationType } from '../../form/validation';

export interface NativeTextFieldProps
  extends
    InputHTMLAttributes<HTMLInputElement>,
    FormItemProps<string, ValidationType> {
  label?: string;
  'data-testid'?: string;
}
