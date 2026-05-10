import type { CheckboxProps } from 'litten/dist/components/checkbox/checkbox.types';
import type { FormItemProps } from '../../../components/form/form.types';
import type { ValidationType } from '../../form/validation';

export interface LittenCheckboxProps
  extends
    FormItemProps<boolean, ValidationType>,
    Omit<CheckboxProps, 'defaultChecked'> {}
