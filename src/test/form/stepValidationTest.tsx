import { Button } from 'litten/dist/button';
import { Mode } from 'litten/dist/enum';

import { FormStory } from '../../stories/form.stories';

import { expect, userEvent, within } from '@storybook/test';
import { Form } from '../../components/form/form';

import { Placement } from 'litten-hooks';
import { FormLabel } from 'litten/dist/formLabel';
import { StackPanel } from 'litten/dist/stackPanel';
import { useState } from 'react';
import { ValidationMode } from '../../components/form/form.types';
import { useForm } from '../../components/form/useForm';
import { TextFieldFormItem } from '../textFieldFormItem';
import { Validation } from '../validation';

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
      <Form ref={formRef} validationMode={ValidationMode.step}>
        <StackPanel direction="column">
          <FormLabel label="Total:" labelPlacement={Placement.top}>
            <TextFieldFormItem
              path="total"
              data-testid="totalInput"
              validations={[
                {
                  helpInfo: 'Total must be provided.',
                  type: Validation.StringRequired,
                },
              ]}
            />
          </FormLabel>
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
        </StackPanel>
        <Button mode={Mode.primary} onClick={handleSaveClick}>
          Save
        </Button>
        <div>{validationMsg}</div>
      </Form>
    </div>
  );
};

export const StepValidationTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByText('Save');
    const countInput = canvas.getByTestId('countInput');
    const totalInput = canvas.getByTestId('totalInput');

    await step(
      'Click save button ,then "Total must be provided. " to be in the document',
      async () => {
        await userEvent.click(saveButton);

        await expect(
          await canvas.findByText('Total must be provided.')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Type 100 into [total] text field, click save button, then "Total must be provided." not to be in the document, "The count must be greater than 0 and less than 100." to be in the document',
      async () => {
        await userEvent.type(totalInput, '100');
        await userEvent.click(saveButton);

        await expect(
          await canvas.queryByText('Total must be provided.')
        ).not.toBeInTheDocument();

        await expect(
          await canvas.findByText(
            'The count must be greater than 0 and less than 100.'
          )
        ).toBeInTheDocument();
      }
    );

    await step(
      'Type 10 into [count] text field, click save button, then "The count must be greater than 0 and less than 100." not to be in the document',
      async () => {
        await userEvent.type(countInput, '10');
        await userEvent.click(saveButton);

        await expect(
          await canvas.queryByText(
            'The count must be greater than 0 and less than 100.'
          )
        ).not.toBeInTheDocument();
      }
    );
  },
};
