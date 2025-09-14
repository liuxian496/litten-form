import { FormStory } from '../../stories/form.stories';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { TextFieldFormItem } from '../textFieldFormItem';
type Data = {
  name: string;
};

const Test = () => {
  const [formRef, myForm] = useForm();

  myForm?.getValues() as Data;
  myForm?.clear();
  myForm?.getValueByPath('name');
  myForm?.setValues([{ path: 'name', value: 'Tom' }]);
  myForm?.setValueByPath('name', 'Jerry');
  myForm?.setHelpTextByPath('count', 'Not registered');
  myForm?.setHelpTextByPath('name', '请输入用户名');

  function render() {
    return (
      <Form ref={formRef}>
        <TextFieldFormItem path="name" />
      </Form>
    );
  }

  return render();
};

export const UseFormTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
};
