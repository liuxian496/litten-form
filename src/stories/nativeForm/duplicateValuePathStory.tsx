import { expect, within } from 'storybook/test';

import { FormStory } from '../nativeForm.stories';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { FormPaths } from '../../pockets/form/form.types';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

const Test = () => {
  const [formRef] = useForm();

  return (
    <Form ref={formRef}>
      <NativeTextField path={FormPaths.name} />
      <NativeTextField path={FormPaths.name} />
    </Form>
  );
};

export const DuplicateValuePathTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Duplicate valuePath', async () => {
      await expect(
        await canvas.findByText(
          '[litten error]: The valuePath "name" is used by other FormControl, Please check your form.'
        )
      ).toBeInTheDocument();
    });
  },
};
