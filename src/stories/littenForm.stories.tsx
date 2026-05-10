import { Meta, StoryObj } from '@storybook/react-vite';

import { Form } from '../components/form/form';

import { CheckboxTest } from './littenForm/checkboxStory';

export default {
  title: 'Test/Litten Form',
  component: Form,
  argTypes: {
    prefixCls: {
      control: false,
    },
    //在示例文档中移除children属性的显示
    children: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof Form>;

export type FormStory = StoryObj<typeof Form>;

export const Checkbox = CheckboxTest;
