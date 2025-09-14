import React from 'react';

import { TextField } from 'litten/dist/textField';

import { within, expect } from '@storybook/test';

import { FormStory } from '../../stories/form.stories';

import { Form } from '../../components/form/form';
import { FormControl } from '../../components/form/formControl';
import { useForm } from '../../components/form/useForm';

const Test = () => {
  const [formRef] = useForm();

  return (
    <Form ref={formRef}>
      <div style={{ marginBottom: '10px' }}>
        <FormControl valuePath="name">
          <TextField />
        </FormControl>
      </div>
      <FormControl valuePath="name">
        <TextField />
      </FormControl>
    </Form>
  );
};

export const DuplicateValuePathTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Duplicate valuePath', async () => {
      await expect(
        await canvas.findByText(
          '[litten error]: The valuePath "name" is used by other FormControl, Please check your form.'
        )
      ).toBeInTheDocument();
    });
  },
};
