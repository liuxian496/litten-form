import { useState } from 'react';

import { NativeCheckbox } from '../../pockets/nativeForm/nativeCheckbox';

import { expect, userEvent, within } from 'storybook/test';

import { FormStory } from '../nativeForm.stories';

import { Form } from '../../components/form/form';
import { useForm } from '../../components/form/useForm';

import { BasicFormData, FormPaths } from '../../pockets/form/form.types';

const Test = () => {
  const [formRef, basicForm] = useForm();

  const [formData, setFormData] = useState<BasicFormData>();

  function handleShowFormDataBtuClick() {
    setFormData(basicForm?.getValues() as BasicFormData);
  }

  function handleSetFruitFalseBtuClick() {
    basicForm?.setValueByPath(FormPaths.fruit, false);
  }

  function handleSetFruitTrueBtuClick() {
    basicForm?.setValueByPath(FormPaths.fruit, true);
  }

  return (
    <>
      <Form ref={formRef}>
        <NativeCheckbox label="Fruit:" path={FormPaths.fruit} />
      </Form>
      <button onClick={handleShowFormDataBtuClick}>Show Form Data</button>
      <button onClick={handleSetFruitFalseBtuClick}>Set Fruit False</button>
      <button onClick={handleSetFruitTrueBtuClick}>Set Fruit True</button>
      <div>{`formData.fruit is ${formData?.fruit}`}</div>
    </>
  );
};

export const CheckboxTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const fruitCheckbox = await canvas.getByRole('checkbox', {
      name: 'Fruit:',
    });

    const showFormDataButton = await canvas.getByText('Show Form Data');
    const setFruitFalseButton = await canvas.getByText('Set Fruit False');
    const setFruitTrueButton = await canvas.getByText('Set Fruit True');

    await step(
      'Click show Form Data Button, Then formData.fruit is false to be in the document,fruit Checkbox is not checked',
      async () => {
        await userEvent.click(showFormDataButton);

        await expect(
          await canvas.findByText('formData.fruit is false')
        ).toBeInTheDocument();

        await expect(fruitCheckbox).not.toBeChecked();
      }
    );

    await step(
      'Click set Fruit True Button, Click show Form Data Button, Then formData.fruit is true to be in the document,fruit Checkbox is checked',
      async () => {
        await userEvent.click(setFruitTrueButton);
        await userEvent.click(showFormDataButton);

        await expect(
          await canvas.findByText('formData.fruit is true')
        ).toBeInTheDocument();

        await expect(fruitCheckbox).toBeChecked();
      }
    );

    await step(
      'Click set Fruit False Button, Click show Form Data Button, Then formData.fruit is false to be in the document,fruit Checkbox is not checked',
      async () => {
        await userEvent.click(setFruitFalseButton);
        await userEvent.click(showFormDataButton);

        await expect(
          await canvas.findByText('formData.fruit is false')
        ).toBeInTheDocument();

        await expect(fruitCheckbox).not.toBeChecked();
      }
    );
  },
};
