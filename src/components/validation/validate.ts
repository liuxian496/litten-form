import { FormItemHelper, FormRegister } from '../form/form.types';

/**
 * 验证所有注册的表单项，并收集验证后的提示文字
 *
 * @param {FormRegister} formRegister - 表单注册器
 * @returns {FormItemHelper[]} 验证后的提示文字
 */
export function validate(formRegister: FormRegister): FormItemHelper[] {
  const itemErrors: FormItemHelper[] = [];

  Object.keys(formRegister).forEach((key) => {
    const formItemValidate = formRegister[key]?.validate;
    const get = formRegister[key]?.get;
    if (formItemValidate && get) {
      const value = get();
      const helpInfo = formItemValidate(value);
      if (helpInfo !== undefined) {
        itemErrors.push({
          helpInfo: helpInfo,
          path: key,
        });
      }
    }
  });

  return itemErrors;
}
