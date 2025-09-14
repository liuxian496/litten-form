import { FormStory } from '../../stories/form.stories';

import { useForm } from '../../components/form/useForm';
type Data = {
  name: string;
};

const Test = () => {
  const spiritForm = useForm();

  spiritForm.getValues() as Data;
  spiritForm.clear();
  spiritForm.getValueByPath('name');
  spiritForm.setValues({ name: 'Jerry' });
  spiritForm.setValueByPath('name', 'Jerry');

  return <>Test TestUseForm</>;
};

export const UseFormTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
};
