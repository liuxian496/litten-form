import { type Meta } from '@storybook/react-vite';

import { Form } from '../components/form/form';

import { CheckboxTest } from './littenForm/checkboxStory';
import { TextFieldTest } from './littenForm/textFieldStory';

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

export const TextField = TextFieldTest;
export const Checkbox = CheckboxTest;
