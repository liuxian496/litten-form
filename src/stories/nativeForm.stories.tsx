import { type Meta } from '@storybook/react-vite';

import { Form } from '../components/form/form';

import { CheckboxTest } from './nativeForm/checkboxStory';
import { DuplicateValuePathTest } from './nativeForm/duplicateValuePathStory';
import { FocusTest } from './nativeForm/focusStory';
import { FormUtilBranchTest } from './nativeForm/formUtilBranchStory';
import { FormUtilTest } from './nativeForm/formUtilStory';
import { InitialValueTest } from './nativeForm/initialValueStory';
import { MultiFormTest } from './nativeForm/multiFormStory';
import { TextFieldTest } from './nativeForm/textFieldStory';
import { UseHelperInfoBranchTest } from './nativeForm/useHelperInfoBranchStory';
import { ValidationBranchTest } from './nativeForm/validationBranchStory';
import { ValidationByStepTest } from './nativeForm/validationByStepStory';
import { ValidationBasicTest } from './nativeForm/validationStory';

export default {
  title: 'Test/Form',
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
export const DuplicateValuePath = DuplicateValuePathTest;
export const ValidationBasic = ValidationBasicTest;
export const ValidationByStep = ValidationByStepTest;
export const ValidationBranch = ValidationBranchTest;
export const FormUtil = FormUtilTest;
export const FormUtilBranch = FormUtilBranchTest;
export const UseHelperInfoBranch = {
  name: 'UseHelperInfo Branch',
  ...UseHelperInfoBranchTest,
};
export const MultiForm = MultiFormTest;
export const Focus = FocusTest;
export const InitialValue = InitialValueTest;
