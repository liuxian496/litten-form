import React, { useState } from "react";

import { LittenTextChangeEvent } from "litten-hooks/dist/control/event/littenEvent.types";
import { Button } from "litten/dist/button";
import { TextField } from "litten/dist/textField";

import { userEvent, within, expect } from "@storybook/test";

import { FormStory } from "../../stories/form.stories";

import { useForm } from "../../components/form/useForm";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";

// type Name = {
//     name: string;
// };

// type Salary = {
//     salary: string;
// };

const Test = () => {
    const nameForm = useForm();
    const salaryForm = useForm();

    const [salary, setSalary] = useState(0);

    function handleNameChange(event: LittenTextChangeEvent) {
        console.log(`name change to ${event.value}`);
    }

    function handlSetNameClick() {
        nameForm.setValueByPath("name", "Tom");

        //测试分支
        nameForm.getValueByPath("mana");
        nameForm.getValueByPath("name");
        nameForm.setValueByPath("mana", 10000000);
    }

    function handleSalaryClick() {
        salaryForm.setValues({
            salary: "1000000",
        });
    }

    function handleSalaryChange(event: LittenTextChangeEvent) {
        setSalary(parseInt(event.value as string));
    }

    return (
        <>
            <Form data-testid="nameForm" formRef={nameForm}>
                <FormControl valuePath="name">
                    <TextField data-testid="name" onChange={handleNameChange} />
                </FormControl>
                <Button onClick={handlSetNameClick}>Set Name</Button>
            </Form>
            <Form
                data-testid="salaryForm"
                formRef={salaryForm}
                style={{ marginTop: "10px" }}
            >
                <FormControl valuePath="salary">
                    <TextField
                        data-testid="salary"
                        onChange={handleSalaryChange}
                    />
                </FormControl>
                <Button onClick={handleSalaryClick}>Set Salary</Button>
            </Form>
            {salary >= 1000000 && <div>恭喜，达成百万年薪</div>}
        </>
    );
};

export const MultiFormTest: FormStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("Tom has 1000000 salary", async () => {
            await userEvent.click(canvas.getByText("Set Name"));

            await expect(
                canvas.getByTestId("name").getAttribute("value")
            ).toEqual("Tom");

            await userEvent.click(canvas.getByText("Set Salary"));

            await expect(
                canvas.getByTestId("salary").getAttribute("value")
            ).toEqual("1000000");

            await expect(
                canvas.getByText("恭喜，达成百万年薪")
            ).toBeInTheDocument();
        });

        await step("Clear", async () => {
            await userEvent.clear(canvas.getByTestId("salary"));

            await expect(
                canvas.queryByText("恭喜，达成百万年薪")
            ).not.toBeInTheDocument();
        });
    },
};
