import {
  FormItemHelper,
  FormRegister,
  ValidationMode,
} from '../form/form.types';

/**
 * 验证所有注册的表单项，遍历每个表单项，调用其验证函数（如果存在）
 *
 * @param formRegister - 表单注册器
 * @returns 包含每个表单项验证信息的 FormItemHelper 数组
 */
function validateAll(formRegister: FormRegister): FormItemHelper[] {
  const itemErrors: FormItemHelper[] = [];

  Object.keys(formRegister).forEach((key) => {
    const currentRegister = formRegister[key];
    const formItemValidate = currentRegister?.validate;
    const get = currentRegister?.get;

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

/**
 * 按步骤验证所有注册的表单项，调用其验证函数（如果存在）
 * 如果验证失败，收集验证信息，并停止验证循环
 *
 * @param formRegister - 表单注册器
 * @returns 包含第一个无效表单项提示信息的数组（FormItemHelper[]），如果所有字段都有效则返回空数组
 */
function validateStep(formRegister: FormRegister): FormItemHelper[] {
  const itemErrors: FormItemHelper[] = [];

  const formRegisterKeys = Object.keys(formRegister);
  const keyLength = formRegisterKeys.length;

  for (let i = 0; i < keyLength; i++) {
    const key = formRegisterKeys[i];
    const currentRegister = formRegister[key];
    const formItemValidate = currentRegister?.validate;
    const get = currentRegister?.get;

    if (formItemValidate && get) {
      const value = get();
      const helpInfo = formItemValidate(value);
      if (helpInfo !== undefined) {
        itemErrors.push({
          helpInfo: helpInfo,
          path: key,
        });
        break;
      }
    }
  }

  return itemErrors;
}

/**
 * 验证所有注册的表单项，并收集验证后的提示信息
 *
 * @param {FormRegister} formRegister - 表单注册器
 * @returns {FormItemHelper[]} 验证后的提示信息
 */
export function validate(
  formRegister: FormRegister,
  validationMode: ValidationMode
): FormItemHelper[] {
  let result: FormItemHelper[] = [];

  if (validationMode === ValidationMode.all) {
    result = validateAll(formRegister);
  } else if (validationMode === ValidationMode.step) {
    result = validateStep(formRegister);
  }

  return result;
}
