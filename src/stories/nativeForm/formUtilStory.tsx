import { expect, userEvent, within } from 'storybook/test';

import { FormStory } from '../nativeForm.stories';

import { useState } from 'react';
import { Form } from '../../components/form/form';
import { ValidationMode } from '../../components/form/form.types';
import { useForm } from '../../components/form/useForm';
import { FormPaths, ValidationType } from '../../pockets/form';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

const congratulatoryMessage = '恭喜达到百万年薪';

const salaryMustBeNumberGreaterThanOneMillion =
  'Salary must be a number greater than 1,000,000.';

const Test = () => {
  const [formRef, basicForm] = useForm();
  const [msg, setMsg] = useState('');

  function handleGetValuesButtonClick() {
    setMsg(JSON.stringify(basicForm?.getValues()));
  }

  function validateSalary(value: unknown): boolean {
    const salary = Number(value);
    if (isNaN(salary)) return false;
    return salary > 1000000;
  }

  function handleClearFormButtonClick() {
    basicForm?.setValues([
      {
        path: FormPaths.name,
        value: '',
      },
    ]);
    basicForm?.setValueByPath(FormPaths.salary, '');
  }

  function handleGetValueByPathButtonClick() {
    const name = basicForm?.getValueByPath(FormPaths.name);
    setMsg(`Name: ${name}`);
  }

  function handleSetHelpInfoButtonClick() {
    basicForm?.setHelpTextByPath(FormPaths.salary, congratulatoryMessage);
  }

  function renderButtonArea() {
    return (
      <div>
        <button onClick={handleGetValuesButtonClick}>Get Values</button>
        <button onClick={handleGetValueByPathButtonClick}>
          Get Value By Path
        </button>
        <button onClick={handleSetHelpInfoButtonClick}>Set Help Info</button>
        <button onClick={handleClearFormButtonClick}>Clear Form</button>
      </div>
    );
  }

  function renderMsg() {
    return <div>{msg}</div>;
  }

  return (
    <>
      <Form ref={formRef} validationMode={ValidationMode.step}>
        <NativeTextField
          label="Name:"
          path={FormPaths.name}
          validations={[
            {
              type: ValidationType.StringRequired,
            },
          ]}
          initialValue="Tom & Jerry"
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
          initialValue="1500000"
        />
      </Form>
      {renderButtonArea()}
      {renderMsg()}
    </>
  );
};

export const FormUtilTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nameInput = canvas.getByLabelText('Name:');
    const salaryInput = canvas.getByLabelText('Salary:');
    const getValuesButton = canvas.getByText('Get Values');
    const getValueByPathButton = canvas.getByText('Get Value By Path');
    const setHelpInfoButton = canvas.getByText('Set Help Info');
    const clearFormButton = canvas.getByText('Clear Form');

    await step(
      'Click Get Values button, Then form values should be displayed correctly',
      async () => {
        await userEvent.click(getValuesButton);

        const msg = canvas.getByText(
          /{"name":"Tom & Jerry","salary":"1500000"}/
        );

        await expect(msg).toBeInTheDocument();
      }
    );

    await step(
      'Click Get Value By Path button, Then form values should be displayed correctly',
      async () => {
        await userEvent.click(getValueByPathButton);

        const msg = canvas.getByText(/Name: Tom & Jerry/);

        await expect(msg).toBeInTheDocument();
      }
    );

    await step(
      'Click Set Help Info button, Then congratulatory message should be displayed as help info for salary field',
      async () => {
        await userEvent.click(setHelpInfoButton);

        await expect(
          canvas.getByText(congratulatoryMessage)
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click Clear Form button, Then form values should be cleared, and validation error message should be displayed for name field and salary field',
      async () => {
        await userEvent.click(clearFormButton);

        await expect(nameInput).toHaveValue('');
        await expect(salaryInput).toHaveValue('');

        await expect(
          canvas.getByText('This field is required.')
        ).toBeInTheDocument();

        await expect(
          canvas.getByText(salaryMustBeNumberGreaterThanOneMillion)
        ).toBeInTheDocument();
      }
    );

    await step(
      'After clearing form, click Get Values button again, Then form values should be displayed correctly with cleared values',
      async () => {
        await userEvent.click(getValuesButton);

        const msg = canvas.getByText(/{"name":"","salary":""}/);

        await expect(msg).toBeInTheDocument();
      }
    );
  },
};
