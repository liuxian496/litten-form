import React, { useState } from "react";

import { Mode } from "litten/dist/enum";
import { Button } from "litten/dist/button";
import { StackPanel } from "litten/dist/stackPanel";
import { TextField } from "litten/dist/textField";

import { userEvent, within, expect } from "@storybook/test";

import { FormStory } from "../../stories/form.stories";

import { useForm } from "../../components/form/useForm";
import { Form } from "../../components/form/form";
import { FormControl } from "../../components/form/formControl";

import { FormLabel } from "litten/dist/formLabel";
type Data = {
    name: string;
    animation: string;
    xy?: object;
};

const Test = () => {
    const myForm = useForm();

    const [msg, setMsg] = useState("");

    function handleShowValueClick() {
        const { name, animation } = myForm.getValues() as Data;

        setMsg(`Name: ${name}, Animation: ${animation}`);
    }

    function handleClearClick() {
        myForm.clear();
    }

    return (
        <>
            <Form formRef={myForm}>
                <span>今天天气不错，挺风和日丽的</span>
                <StackPanel
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="flex-start"
                >
                    <FormLabel label="Name:">
                        <FormControl valuePath="name">
                            <TextField data-testid="nameTextField" />
                        </FormControl>
                    </FormLabel>
                    <FormLabel label="Animation:">
                        <FormControl valuePath="animation">
                            <TextField
                                data-testid="animationTextField"
                                defaultValue="Tom & Jerry"
                            />
                        </FormControl>
                    </FormLabel>
                </StackPanel>
            </Form>
            <Button mode={Mode.primary} onClick={handleShowValueClick}>
                Show Value
            </Button>
            <Button onClick={handleClearClick}>Clear</Button>
            <div style={{ marginTop: "10px" }}>{msg}</div>
        </>
    );
};

export const DefaultTest: FormStory = {
    parameters: {
        controls: { hideNoControlsWarning: true },
    },
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const nameTextField = canvas.getByTestId("nameTextField");
        const animationTextField = canvas.getByTestId("animationTextField");

        const showValueBtu = canvas.getByText("Show Value");
        const clearBtu = canvas.getByText("Clear");

        await step(
            'Default "Name" is "", defualt "Animation" is Tom & Jerry',
            async () => {
                await expect(nameTextField).toHaveValue("");

                await expect(animationTextField).toHaveValue("Tom & Jerry");
            }
        );

        await step('Type "Name" Tom, "Age" 6, "Animation" 2', async () => {
            await userEvent.type(nameTextField, "Tom");
            await userEvent.type(animationTextField, "2");

            await expect(nameTextField).toHaveValue("Tom");

            await expect(animationTextField).toHaveValue("Tom & Jerry2");

            await userEvent.click(showValueBtu);

            await expect(
                canvas.getByText("Name: Tom, Animation: Tom & Jerry2")
            ).toBeInTheDocument();
        });

        await step(
            'Clear Form, then default "Name" is "", defualt "Animation" is Tom & Jerry',
            async () => {
                await userEvent.click(clearBtu);

                await expect(nameTextField).toHaveValue("");

                await expect(animationTextField).toHaveValue("Tom & Jerry");

                await userEvent.click(showValueBtu);

                await expect(
                    canvas.getByText("Name: , Animation: Tom & Jerry")
                ).toBeInTheDocument();
            }
        );
    },
};
