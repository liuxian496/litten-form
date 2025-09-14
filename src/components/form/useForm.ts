import { useEffect, useRef, useState } from 'react';
import { FormRef } from './form.types';

/**
 * 获取表单ref的自定义hook
 *
 * @returns {[React.MutableRefObject<FormRef | undefined>, FormRef | undefined]} 返回一个元组：
 * - ref：表单的可变 ref 对象
 * - myForm：`FormRef` 类型的表单对象，包含操作表单的方法
 *
 * @example
 * const [ref, myForm] = useForm();
 */
export function useForm() {
  const ref = useRef<FormRef>();
  const [myForm, setMyForm] = useState<FormRef | undefined>();

  useEffect(() => {
    const current = ref.current;
    if (current) {
      setMyForm(current);
    }

    return () => {
      ref.current = undefined;
    };
  }, [ref]);

  return [ref, myForm] as [
    React.MutableRefObject<FormRef | undefined>,
    FormRef | undefined,
  ];
}
