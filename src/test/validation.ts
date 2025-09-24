import { BaseValidation } from '../components/form/formBase';

export const Validation = {
  ...BaseValidation,
  /**
   * 字符串必填
   */
  StringRequired: 'stringRequired',
} as const;

export type ValidationType = (typeof Validation)[keyof typeof Validation];
