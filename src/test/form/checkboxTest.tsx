import React, { useState } from "react";

import { Button } from "litten/dist/button";
import { Checkbox } from "litten/dist/checkbox";
import { FormLabel } from "litten/dist/formLabel";

import { userEvent, within, expect } from "@storybook/test";

import { FormStory } from "../../stories/form.stories";

import { useForm } from "../../components/form/useForm";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";

type Data = {
    fruit: boolean;
};

const Test = () => {
    const [formData, setFormData] = useState<Data>();

    const myForm = useForm();

    function handleShowFormDataBtuClick() {
        setFormData(myForm.getValues() as Data);
    }

    function handleSetFruitBtuClick() {
        myForm.setValueByPath("fruit", false);
    }

    return (
        <>
            <Form formRef={myForm}>
                <FormLabel label="Fruit:">
                    <FormControl valuePath="fruit">
                        <Checkbox data-testid="fruit" defaultChecked={false} />
                    </FormControl>
                </FormLabel>
            </Form>

            <Button
                data-testid="showFormDataBtu"
                onClick={handleShowFormDataBtuClick}
            >
                Show Form Data
            </Button>
            <Button
                data-testid="setFormDataBtu"
                onClick={handleSetFruitBtuClick}
            >
                Set Fruit False
            </Button>
            <div>{`formData.fruit is ${formData?.fruit}`}</div>
        </>
    );
};

export const CheckboxTest: FormStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const fruitCheckbox = canvas.getByTestId("fruit");

        const showFormDataBtu = canvas.getByTestId("showFormDataBtu");
        const setFormDataBtu = canvas.getByTestId("setFormDataBtu");

        await step(
            'Set "Fruit" checkbox defaultChecked is false, Click "Show Form Data" button. Then fruit is false',
            async () => {
                await expect(
                    await canvas.findByText("formData.fruit is undefined")
                ).toBeInTheDocument();

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is false")
                ).toBeInTheDocument();

                await expect(fruitCheckbox).not.toBeChecked();
            }
        );

        await step(
            'Click "Fruit" checkbox, Click "Show Form Data" button. Then fruit is true',
            async () => {
                await userEvent.click(fruitCheckbox);

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is true")
                ).toBeInTheDocument();

                await expect(fruitCheckbox).toBeChecked();
            }
        );

        await step(
            'Click "Set Fruit False" button, Click "Show Form Data" button. Then fruit is false',
            async () => {
                await userEvent.click(setFormDataBtu);

                await expect(fruitCheckbox).not.toBeChecked();

                await userEvent.click(showFormDataBtu);

                await expect(
                    await canvas.findByText("formData.fruit is false")
                ).toBeInTheDocument();
            }
        );
    },
};
