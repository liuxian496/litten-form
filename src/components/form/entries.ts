/**
 * 当在表单中无法找到对应的值路径时的警告信息
 * @param path 表单项的值在表单数据中的属性路径
 * @returns 警告信息字符串
 */
export function valuePathNotFoundEntry(path: string) {
  return `Can not find the path "${path}" in form. Please check if the form item is registered.`;
}

/**
 * 当setValues函数的第一个参数不是FormArgs数组时的警告信息
 * @returns 警告信息字符串
 */
export function setValuesFirstParamNotArray() {
  return 'The first parameter of setValues should be an array of FormArgs';
}

/**
 * 当在表单项注册器中找不到set方法时的警告信息
 * @returns 警告信息字符串
 */
export function setMethodNotFound() {
  return 'Can not find set method in form item register.';
}

/**
 * 当在表单项注册器中找不到commonValidationAssert方法时的警告信息
 * @returns
 */
export function commonValidationAssertNotFound() {
  return 'Can not find commonValidationAssert in formInjector, please provide it to support validation types other than Customize.';
}

/**
 * 当尝试聚焦一个不存在的表单项时的警告信息
 * @param path 表单项的唯一路径（path）
 * @returns 警告信息字符串
 */
export function focusNotFound(path: string) {
  return `The fieldRef for path "${path}" does not have a focus method.`;
}
