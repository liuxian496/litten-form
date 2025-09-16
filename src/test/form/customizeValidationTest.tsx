import { Button } from 'litten/dist/button';
import { Mode } from 'litten/dist/enum';

import { FormStory } from '../../stories/form.stories';

import { expect, userEvent, within } from '@storybook/test';
import { Form } from '../../components/form/form';

import { Placement } from 'litten-hooks';
import { FormLabel } from 'litten/dist/formLabel';
import { StackPanel } from 'litten/dist/stackPanel';
import { useState } from 'react';
import { useForm } from '../../components/form/useForm';
import { TextFieldFormItem, Validation } from '../textFieldFormItem';

const Test = () => {
  const [formRef, myForm] = useForm();
  const [validationMsg, setValidationMsg] = useState<string | undefined>();

  function handleSaveClick() {
    const result = myForm?.validate();
    if (result?.length === 0) {
      setValidationMsg(undefined);
    } else {
      setValidationMsg('Validation failed');
    }
  }

  return (
    <div>
      <Form ref={formRef}>
        <StackPanel direction="column">
          <FormLabel label="Count:" labelPlacement={Placement.top}>
            <TextFieldFormItem
              path="count"
              data-testid="countInput"
              validations={[
                {
                  helpInfo:
                    'The count must be greater than 0 and less than 100.',
                  type: Validation.Customize,
                  validationAssert: (value) => {
                    const count = Number(value);
                    return count > 0 && count < 100;
                  },
                },
              ]}
            />
          </FormLabel>
          <FormLabel label="Total:" labelPlacement={Placement.top}>
            <TextFieldFormItem
              path="total"
              validations={[
                {
                  helpInfo: 'The total must be greater than 0.',
                  type: Validation.Customize,
                },
              ]}
            />
          </FormLabel>
        </StackPanel>
        <Button mode={Mode.primary} onClick={handleSaveClick}>
          Save
        </Button>
        <div>{validationMsg}</div>
      </Form>
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
    const countInput = canvas.getByTestId('countInput');

    await step(
      'Click save button, then "The count must be greater than 0 and less than 100." to be in the document, "The total must be greater than 0." not to be in the document.',
      async () => {
        await userEvent.click(saveButton);

        await expect(
          await canvas.findByText(
            'The count must be greater than 0 and less than 100.'
          )
        ).toBeInTheDocument();

        await expect(
          await canvas.queryByText('The total must be greater than 0.')
        ).not.toBeInTheDocument();

        await expect(
          await canvas.queryByText('Validation failed')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Type [66] into the count field and click save button, then "The count must be greater than 0 and less than 100." not to be in the document, "Validation failed" not to be in the document.',
      async () => {
        await userEvent.type(countInput, '66');
        await userEvent.click(saveButton);

        await expect(
          await canvas.queryByText('Validation failed')
        ).not.toBeInTheDocument();
      }
    );
  },
};
