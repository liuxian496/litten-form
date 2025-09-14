import { FormInjector, VerifyFormItemFunction } from './form/form.types';
import { Validation } from './form/textFieldFormItem';

export const formInjector: FormInjector = {
  extendVerifyFormItem: undefined,
};

export function injectVerifyFormItem(verifyFormItem: VerifyFormItemFunction) {
  formInjector.extendVerifyFormItem = verifyFormItem;
}

injectVerifyFormItem((value, type) => {
  let result = false;

  if (type === Validation.StringRequired) {
    result = typeof value === 'string' && value.trim() !== '';
  }

  return result;
});
