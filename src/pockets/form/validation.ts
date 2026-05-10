import { BaseValidation } from '../../components/form/formBase';

export const ValidationType = {
  ...BaseValidation,
  /**
   * 字符串必填
   */
  StringRequired: 'stringRequired',
} as const;

export type ValidationType =
  (typeof ValidationType)[keyof typeof ValidationType];

export function commonValidationAssert(
  value: unknown,
  validationType: ValidationType
) {
  switch (validationType) {
    case ValidationType.StringRequired:
      return typeof value === 'string' && value.trim() !== '';
    default:
      return true;
  }
}

export function getDefaultHelperInfo(validationType: ValidationType) {
  switch (validationType) {
    case ValidationType.StringRequired:
      return 'This field is required.';
    default:
      return '';
  }
}
