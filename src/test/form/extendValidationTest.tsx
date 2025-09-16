import { Button } from 'litten/dist/button';
import { Mode } from 'litten/dist/enum';

import { FormStory } from '../../stories/form.stories';

import { expect, userEvent, within } from '@storybook/test';
import { Form } from '../../components/form/form';

import { Placement } from 'litten-hooks';
import { FormLabel } from 'litten/dist/formLabel';
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
        <FormLabel label={'Name:'} labelPlacement={Placement.top}>
          <TextFieldFormItem
            data-testid="nameTextField"
            path="name"
            validations={[
              {
                helpInfo: '名称不能为空',
                type: Validation.StringRequired,
                validationAssert: (value) => {
                  const count = Number(value);
                  return count > 0 && count < 100;
                },
              },
            ]}
          />
        </FormLabel>
      </Form>
      <Button mode={Mode.primary} onClick={handleSaveClick}>
        Save
      </Button>
    </div>
  );
};

export const ExtendValidationTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByText('Save');
    const nameTextField = canvas.getByTestId('nameTextField');

    await step(
      'Click save button, then "名称不能为空" to be in the document.',
      async () => {
        await userEvent.click(saveButton);

        await expect(
          await canvas.findByText('名称不能为空')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Type "tom" in name text field, click save button, then "名称不能为空" to be removed from the document.',
      async () => {
        await userEvent.type(nameTextField, 'tom');

        await userEvent.click(saveButton);

        await expect(
          await canvas.queryByText('名称不能为空')
        ).not.toBeInTheDocument();
      }
    );
  },
};
