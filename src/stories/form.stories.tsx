import { Meta, StoryObj } from '@storybook/react';

import { Form } from '../components/form/form';

import { CheckboxTest } from '../test/form/checkboxTest';
import { CustomizeValidationTest } from '../test/form/customizeValidationTest';
import { DefaultTest } from '../test/form/defaultTest';
import { DuplicateValuePathTest } from '../test/form/duplicateValuePathTest';
import { ExtendValidationTest } from '../test/form/extendValidationTest';
import { MultiFormTest } from '../test/form/mulitiFormTest';
import { StepValidationTest } from '../test/form/stepValidationTest';
import { UseFormTest } from '../test/form/useFormTest';

export default {
  title: 'Example/Form',
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

export const Default = DefaultTest;

export const Checkbox = CheckboxTest;

export const DuplicateValuePath = {
  name: 'Duplicate ValuePath',
  ...DuplicateValuePathTest,
};

export const MultiForm = MultiFormTest;

export const CustomizeValidation = CustomizeValidationTest;

export const StepValidation = StepValidationTest;

export const UseForm = UseFormTest;

export const ExtendValidation = ExtendValidationTest;
