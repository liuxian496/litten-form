import { NativeCheckbox } from '@/pockets/nativeForm/nativeCheckbox';

import { FormPaths } from '../../pockets/form/form.types';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';

import { type FormStory } from './nativeFormStory.types';

// eslint-disable-next-line react-refresh/only-export-components
const Test = () => {
  const [formRef] = useForm();

  return (
    <div>
      <Form ref={formRef}>
        {/**如果受控组件的初始值时undefined，输入时，控制台会报错 */}
        <NativeTextField
          data-testid="roleTextField"
          label="Role:"
          path={FormPaths.role}
        />
        <NativeCheckbox label="Fruit:" path={FormPaths.fruit} />
      </Form>
    </div>
  );
};

export const InitialValueTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
};
