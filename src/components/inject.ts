import { FormInjector, VerifyFormItemFunction } from './form/form.types';

export const formInjector: FormInjector = {
  extendVerifyFormItem: undefined,
};

export function injectVerifyFormItem(verifyFormItem: VerifyFormItemFunction) {
  formInjector.extendVerifyFormItem = verifyFormItem;
}
