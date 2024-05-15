import { Meta, StoryObj } from "@storybook/react";

import { Form } from "../components/form/form";

import { DefaultTest } from "../test/form/defaultTest";
import { CheckboxTest } from "../test/form/checkboxTest";
import { DuplicateValuePathTest } from "../test/form/duplicateValuePathTest";
import { MultiFormTest } from "../test/form/mulitiFormTest";
import { UseFormTest } from "../test/form/useFormTest";

export default {
    title: "Example/Form",
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
    name: "Duplicate ValuePath",
    ...DuplicateValuePathTest,
};

export const MultiForm = MultiFormTest;

export const UseForm = {
    name: "useForm",
    ...UseFormTest,
};
