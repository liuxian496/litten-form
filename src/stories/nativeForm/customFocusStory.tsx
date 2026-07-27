import { expect, userEvent, within } from 'storybook/test';

import { Form } from '@/components/form/form';
import { useForm } from '@/components/form/useForm';
import { FormPaths, ValidationType } from '@/pockets/form';

import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

import type { FormStory } from './nativeFormStory.types';

// eslint-disable-next-line react-refresh/only-export-components
const Test = () => {
  const [formRef, basicForm] = useForm();

  function handleSaveBtuClick() {
    const errors = basicForm?.validate({ focusOnError: false }) || [];
    if (errors.length > 0) {
      basicForm?.focusFieldByPath(errors[errors.length - 1].path);
      return;
    }

    console.log('call your API');
  }

  function renderButtonArea() {
    return (
      <div>
        <button onClick={handleSaveBtuClick}>{'Save'}</button>
      </div>
    );
  }

  function render() {
    return (
      <>
        <Form ref={formRef}>
          <NativeTextField
            label="Name:"
            path={FormPaths.name}
            validations={[{ type: ValidationType.StringRequired }]}
          />
          <NativeTextField
            label="Salary:"
            path={FormPaths.salary}
            validations={[{ type: ValidationType.StringRequired }]}
          />
        </Form>
        {renderButtonArea()}
      </>
    );
  }
  return render();
};

export const CustomFocusTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const saveButton = canvas.getByRole('button', { name: 'Save' });
    const nameInput = await canvas.findByLabelText('Name:');
    const salaryInput = await canvas.findByLabelText('Salary:');

    await step(
      'When clicking Save without filling any fields, the last required field (Salary) should receive focus and display its required message.',
      async () => {
        await userEvent.click(saveButton);

        expect(
          await canvas.findAllByText('This field is required.')
        ).toHaveLength(2);
        expect(nameInput).not.toHaveFocus();
        expect(salaryInput).toHaveFocus();
      }
    );
  },
};
