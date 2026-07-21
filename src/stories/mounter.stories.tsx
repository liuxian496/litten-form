import { type Meta } from '@storybook/react-vite';

import { Mounter } from '../components/mounter';

import { CascadingFormStory } from './mounter/cascadingFormStory';

export default {
  title: 'Test/Mounter',
  component: Mounter,
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
} as Meta<typeof Mounter>;

export const CascadingForm = CascadingFormStory;
