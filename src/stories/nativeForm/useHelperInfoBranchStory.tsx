import { expect, spyOn, userEvent } from 'storybook/test';

import { commonValidationAssertNotFound } from '../../components/form/entries';
import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';
import { initLittenForm } from '../../components/inject';
import { FormPaths } from '../../pockets/form';
import {
  commonValidationAssert,
  getDefaultHelperInfo,
  ValidationType,
} from '../../pockets/form/validation';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';
import { FormStory } from '../nativeForm.stories';

const Test = () => {
  const [formRef, basicForm] = useForm();

  function handleSaveButtonClick() {
    const validationResult = basicForm?.validate() ?? [];
    if (validationResult?.length > 0) return;
    const values = basicForm?.getValues();

    console.log('Form values:', values);
  }

  return (
    <div>
      测试useHelperInfo的分支逻辑{' '}
      <Form ref={formRef}>
        <NativeTextField
          data-testid="roleTextField"
          label="Role:"
          path={FormPaths.role}
          validations={[
            {
              type: ValidationType.StringRequired,
            },
          ]}
        />
      </Form>
      <button onClick={handleSaveButtonClick}>Save</button>
    </div>
  );
};

export const UseHelperInfoBranchTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvas, step }) => {
    const warnSpy = spyOn(console, 'warn').mockImplementation(() => {});
    const saveButton = canvas.getByText('Save');

    try {
      initLittenForm({});

      await step(
        `Set [initLittenForm] with empty object, Click Save Button, Then warning is shown and helper info is not shown`,
        async () => {
          await userEvent.click(saveButton);

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${commonValidationAssertNotFound()}`
          );

          await expect(
            canvas.queryByText('This field is required.')
          ).toBeNull();
        }
      );
    } finally {
      warnSpy.mockRestore();

      initLittenForm({
        commonValidationAssert: commonValidationAssert,
        getDefaultHelperInfo: getDefaultHelperInfo,
      });

      await step(
        `Reset [initLittenForm] with commonValidationAssert and getDefaultHelperInfo, Click Save Button, Then helper info is shown`,
        async () => {
          await userEvent.click(saveButton);

          await expect(
            canvas.queryByText('This field is required.')
          ).toBeInTheDocument();
        }
      );
    }
  },
};
