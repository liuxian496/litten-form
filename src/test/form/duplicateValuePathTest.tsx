import { expect, within } from '@storybook/test';

import { FormStory } from '../../stories/form.stories';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { TextFieldFormItem } from '../textFieldFormItem';

const Test = () => {
  const [formRef] = useForm();

  return (
    <Form ref={formRef}>
      <TextFieldFormItem path="name" data-testid="nameInput" />
      <div style={{ marginBottom: '10px' }}></div>
      <TextFieldFormItem path="name" data-testid="nameInput" />
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
