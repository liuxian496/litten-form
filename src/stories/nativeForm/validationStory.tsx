import { expect, userEvent, within } from 'storybook/test';

import { FormStory } from '../nativeForm.stories';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { FormPaths, ValidationType } from '../../pockets/form';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

const salaryMustBeNumberGreaterThanOneMillion =
  'Salary must be a number greater than 1,000,000.';

const Test = () => {
  const [formRef, basicForm] = useForm();

  function handleSaveButtonClick() {
    const validationResult = basicForm?.validate() ?? [];
    if (validationResult?.length > 0) return;
    const values = basicForm?.getValues();

    console.log('Form values:', values);
  }

  function validateSalary(value: unknown): boolean {
    const salary = Number(value);
    if (isNaN(salary)) return false;
    return salary > 1000000;
  }

  return (
    <>
      <Form ref={formRef}>
        <NativeTextField
          label="Name:"
          path={FormPaths.name}
          validations={[
            {
              type: ValidationType.StringRequired,
            },
          ]}
        />
        <NativeTextField
          label="Salary:"
          path={FormPaths.salary}
          validations={[
            {
              type: ValidationType.Customize,
              validationAssert: validateSalary,
              helpInfo: salaryMustBeNumberGreaterThanOneMillion,
            },
          ]}
        />
      </Form>
      <button onClick={handleSaveButtonClick}>Save</button>
    </>
  );
};

export const ValidationBasicTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByLabelText('Name:');
    const salaryInput = canvas.getByLabelText('Salary:');
    const saveButton = canvas.getByText('Save');

    await step(
      'Click Save button with empty fields, Then all validation errors to be displayed',
      async () => {
        await userEvent.click(saveButton);

        const nameError = await canvas.findByText('This field is required.');
        const salaryError = await canvas.findByText(
          salaryMustBeNumberGreaterThanOneMillion
        );

        await expect(nameError).toBeInTheDocument();
        await expect(salaryError).toBeInTheDocument();
      }
    );

    await step(
      'Enter valid name but invalid salary, Click Save button, Then "Salary" validation error to be displayed',
      async () => {
        await userEvent.type(nameInput, 'Tom');
        await userEvent.type(salaryInput, '500000');
        await userEvent.click(saveButton);

        const salaryError = await canvas.findByText(
          salaryMustBeNumberGreaterThanOneMillion
        );

        await expect(salaryError).toBeInTheDocument();
      }
    );

    await step(
      'Enter valid name and valid salary, Click Save button, Then no validation errors to be displayed',
      async () => {
        await userEvent.clear(salaryInput);
        await userEvent.type(salaryInput, '1500000');
        await userEvent.click(saveButton);

        const nameError = canvas.queryByText('This field is required.');
        const salaryError = canvas.queryByText(
          salaryMustBeNumberGreaterThanOneMillion
        );

        await expect(nameError).not.toBeInTheDocument();
        await expect(salaryError).not.toBeInTheDocument();
      }
    );
  },
};
