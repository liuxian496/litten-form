import { useState } from 'react';

import { expect, userEvent, within } from 'storybook/test';

import { FormStory } from '../nativeForm.stories';

import { Form } from '../../components/form/form';

import { useForm } from '../../components/form/useForm';

import { BasicFormData, FormPaths } from '../../pockets/form/form.types';
import { NativeTextField } from '../../pockets/nativeForm/nativeTextField';

const Test = () => {
  const [formRef, basicForm] = useForm();

  const [msg, setMsg] = useState('');

  function handleShowValueClick() {
    const { role, animation } = basicForm?.getValues() as BasicFormData;

    setMsg(`Role: ${role}, Animation: ${animation}`);
  }

  function handleClearClick() {
    basicForm?.setValues([
      {
        path: FormPaths.role,
        value: '',
      },
      {
        path: FormPaths.animation,
        value: '',
      },
    ]);
  }

  return (
    <div>
      <Form ref={formRef}>
        <NativeTextField
          data-testid="roleTextField"
          label="Role:"
          path={FormPaths.role}
          initialValue="Tom"
        />
        <NativeTextField
          data-testid="animationTextField"
          label="Animation Name:"
          path={FormPaths.animation}
          initialValue="Tom & Jerry"
        />
      </Form>
      <button onClick={handleShowValueClick}>Show Value</button>
      <button onClick={handleClearClick}>Clear</button>
      <div style={{ marginTop: '10px' }}>{msg}</div>
    </div>
  );
};

export const TextFieldTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    const roleTextField = await canvas.findByTestId('roleTextField');
    const animationTextField = await canvas.findByTestId('animationTextField');

    const showValueButton = await canvas.findByRole('button', {
      name: 'Show Value',
    });
    const clearButton = await canvas.findByRole('button', { name: 'Clear' });

    await step(
      'Role TextField Initial Value is Tom, Animation TextField Initial Value is Tom & Jerry',
      async () => {
        await expect(roleTextField).toHaveValue('Tom');
        await expect(animationTextField).toHaveValue('Tom & Jerry');
      }
    );

    await step(
      'Click Show Value Button, Then "Role: Tom, Animation: Tom & Jerry" to be in the document',
      async () => {
        await userEvent.click(showValueButton);

        await expect(
          await canvas.findByText('Role: Tom, Animation: Tom & Jerry')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Type "Jerry" in Role TextField, Click Show Value Button, Then "Role: Jerry, Animation: Tom & Jerry" to be in the document',
      async () => {
        await userEvent.clear(roleTextField);
        await userEvent.type(roleTextField, 'Jerry');

        await userEvent.click(showValueButton);

        await expect(
          await canvas.findByText('Role: Jerry, Animation: Tom & Jerry')
        ).toBeInTheDocument();
      }
    );

    await step(
      'Click clear Button, Click show Value Button, Then Role TextField value is "", Animation TextField value is "" and "Role: , Animation:" to be in the document',
      async () => {
        await userEvent.click(clearButton);
        await userEvent.click(showValueButton);

        await expect(roleTextField).toHaveValue('');
        await expect(animationTextField).toHaveValue('');

        await expect(
          await canvas.findByText('Role: , Animation:')
        ).toBeInTheDocument();
      }
    );
  },
};
