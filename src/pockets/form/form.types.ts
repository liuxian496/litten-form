/**
 * 定义表单字段路径的常量对象，包含了表单中可能出现的字段路径。这些路径用于在表单组件中访问和更新对应的字段值。
 * @property {string} animation - 动画名称的字段路径。
 * @property {string} count - 数量的字段路径。
 * @property {string} fruit - 是否是水果的字段路径。
 * @property {string} name - 姓名的字段路径。
 * @property {string} role - 角色的字段路径。
 * @property {string} salary - 薪水的字段路径。
 * @property {string} total - 总计的字段路径。
 */
export const FormPaths = {
  /**
   * 动画名称的字段路径
   */
  animation: 'animation',
  /**
   * 数量的字段路径
   */
  count: 'count',
  /**
   * 是否是水果的字段路径
   */
  fruit: 'fruit',
  /**
   * 姓名的字段路径
   */
  name: 'name',
  /**
   * 角色的字段路径
   */
  role: 'role',
  /**
   * 年薪的字段路径
   */
  salary: 'salary',
  /**
   * 总数的字段路径
   */
  total: 'total',
};

/**
 * 定义表单数据的类型，包含了表单中可能出现的字段和它们的类型。每个字段都是可选的，以适应不同的测试场景。
 * @property {string} animation - 动画名称，类型为字符串。
 * @property {number} count - 数量，类型为数字。
 * @property {boolean} fruit - 是否是水果，类型为布尔值。
 * @property {string} name - 姓名，类型为字符串。
 * @property {string} role - 角色，类型为字符串。
 * @property {number} salary - 薪水，类型为数字。
 * @property {number} total - 总计，类型为数字。
 */
export type BasicFormData = {
  animation?: string;
  count?: number;
  fruit?: boolean;
  name?: string;
  role?: string;
  salary?: number;
  total?: number;
};
