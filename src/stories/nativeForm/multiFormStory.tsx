import { within } from 'storybook/test';


import { FormPaths, ValidationType } from '../../pockets/form';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { type FormStory } from '../nativeForm/nativeFormStory.types';

const Test = () => {
  const [nameFormRef, nameForm] = useForm();
  const [salaryFormRef, salaryForm] = useForm();

  function handleSaveButtonClick() {
    const nameValidationResult = nameForm?.validate() ?? [];
    if (nameValidationResult?.length > 0) return;
    const nameValues = nameForm?.getValues();

    const salaryValidationResult = salaryForm?.validate() ?? [];
    if (salaryValidationResult?.length > 0) return;
    const salaryValues = salaryForm?.getValues();

    console.log('Form values:', { ...nameValues, ...salaryValues });
  }

  function renderNameForm() {
    return (
      <div>
        <Form data-testid="nameForm" ref={nameFormRef}>
          <NativeTextField
            data-testid="name"
            path={FormPaths.name}
            validations={[
              {
                type: ValidationType.StringRequired,
              },
            ]}
          />
        </Form>
      </div>
    );
  }

  function renderSalaryForm() {
    return (
      <Form
        data-testid="salaryForm"
        ref={salaryFormRef}
        style={{ marginTop: '10px' }}
      >
        <NativeTextField data-testid="salary" path="salary" />
      </Form>
    );
  }

  return (
    <>
      {renderNameForm()}
      {renderSalaryForm()}
      <button onClick={handleSaveButtonClick}>Save</button>
    </>
  );
};

export const MultiFormTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
  },
};
