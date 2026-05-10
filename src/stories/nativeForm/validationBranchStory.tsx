import { expect } from 'storybook/test';

import { ValidationMode } from '../../components/form/form.types';
import { validate } from '../../components/validation';
import { FormStory } from '../nativeForm.stories';

const Test = () => {
  return <div>测试验证相关方法的分支逻辑</div>;
};

export const ValidationBranchTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ step }) => {
    await step(
      'In "validateAll", when form item has validate method, but has no get method, Then validateAll should skip this item and not throw error',
      async () => {
        const helpInfos = validate(
          {
            name: {
              path: 'name',
              validate: (value) => {
                return typeof value === 'string' && value.trim() !== ''
                  ? 'This field is required.'
                  : undefined;
              },
            },
          },
          ValidationMode.all
        );

        await expect(helpInfos).toEqual([]);
      }
    );

    await step(
      'In "validateStep", when form item has validate method, but has no get method, Then validateAll should skip this item and not throw error',
      async () => {
        const helpInfos = validate(
          {
            name: {
              path: 'name',
              validate: (value) => {
                return typeof value === 'string' && value.trim() !== ''
                  ? 'This field is required.'
                  : undefined;
              },
            },
          },
          ValidationMode.step
        );

        await expect(helpInfos).toEqual([]);
      }
    );
  },
};
