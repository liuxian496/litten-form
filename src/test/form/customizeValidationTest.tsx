import { Button } from 'litten/dist/button';
import { Mode } from 'litten/dist/enum';

import { FormStory } from '../../stories/form.stories';

import { expect, userEvent, within } from '@storybook/test';
import { Form } from '../../components/form/form';

import { useForm } from '../../components/form/useForm';
import { TextFieldFormItem, Validation } from '../textFieldFormItem';

const Test = () => {
  const [formRef, myForm] = useForm();

  function handleSaveClick() {
    const result = myForm?.validate();
    console.log('result', result);
  }

  return (
    <div>
      <Form ref={formRef}>
        <TextFieldFormItem
          path="count"
          validations={[
            {
              helpInfo: '数量需要大于0并且小于100',
              type: Validation.Customize,
              validationAssert: (value) => {
                const count = Number(value);
                return count > 0 && count < 100;
              },
            },
          ]}
        />
        <TextFieldFormItem
          path="total"
          validations={[
            {
              helpInfo: '总数需要大于0',
              type: Validation.Customize,
            },
          ]}
        />
      </Form>
      <Button mode={Mode.primary} onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export const CustomizeValidationTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByText('Save');

    await step(
      'Click save button, then "数量需要大于0并且小于100" to be in the document.',
      async () => {
        await userEvent.click(saveButton);

        await expect(
          await canvas.findByText('数量需要大于0并且小于100')
        ).toBeInTheDocument();
      }
    );
  },
};
