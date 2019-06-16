import React, { useState } from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import Select from "antd/lib/select";
import Icon from "antd/lib/icon";

import useForm from "../hooks/useForm";

type Inputs = {
    recipeName: string;
    serves: number;
};

type Props = {
    formInputCallback: (inputs: Inputs) => void;
};

const AddRecipeForm = (props: Props) => {
    const [ingredientNumber, setIngredientNumber] = useState(1);

    const recipeFormOkCallback = () => {
        props.formInputCallback({ ...inputs, ingredientNumber });
        setIngredientNumber(1);
    };
    const recipeFormCancelCallback = () => {
        setIngredientNumber(1);
    };

    const {
        handleShowForm,
        handleFormCancel,
        handleFormOk,
        handleInputChange,
        handleInputNumberChange,
        handleSelectChange,
        inputs,
        formVisible
    }: {
        handleShowForm: () => void;
        handleFormCancel: (event: React.MouseEvent) => void;
        handleFormOk: (event: React.MouseEvent) => void;
        handleInputChange: (event: any) => void;
        handleInputNumberChange: (
            fieldName: string
        ) => (value: number | undefined) => void;
        handleSelectChange: (fieldName: string) => (value: string) => void;
        inputs: any;
        formVisible: boolean;
    } = useForm(recipeFormOkCallback, recipeFormCancelCallback);

    const getIngredientInputs = (ingredientNumber: number) => {
        let ingredientForms = [];
        for (let i = 0; i < ingredientNumber; i++) {
            ingredientForms.push(
                <Form.Item key={i} required={true}>
                    <Input.Group compact>
                        <Input
                            placeholder={"Name"}
                            style={{ width: "40%" }}
                            onChange={handleInputChange}
                            name={`ingredientName${i}`}
                            value={inputs[`ingredientName${i}`]}
                        />
                        <InputNumber
                            placeholder={"Size"}
                            style={{ width: "20%" }}
                            min={0.01}
                            onChange={handleInputNumberChange(
                                `ingredientSize${i}`
                            )}
                            name={`ingredientSize${i}`}
                            value={inputs[`ingredientSize${i}`]}
                        />
                        <InputNumber
                            placeholder={"Quantity"}
                            style={{ width: "20%" }}
                            min={0.01}
                            onChange={handleInputNumberChange(
                                `ingredientQuantity${i}`
                            )}
                            name={`ingredientQuantity${i}`}
                            value={inputs[`ingredientQuantity${i}`]}
                        />
                        <Select
                            placeholder={"Unit"}
                            onChange={handleSelectChange(`ingredientUnit${i}`)}
                            style={{ width: "20%" }}
                            value={inputs[`ingredientUnit${i}`]}
                        >
                            <Select.Option value="g">g</Select.Option>
                            <Select.Option value="kg">kg</Select.Option>
                            <Select.Option value="ml">ml</Select.Option>
                            <Select.Option value="L">L</Select.Option>
                            <Select.Option value="-">None</Select.Option>
                        </Select>
                    </Input.Group>
                </Form.Item>
            );
        }
        return ingredientForms;
    };

    const incrementIngredientNumber = () => {
        setIngredientNumber(ingredientNumber + 1);
    };

    const decrementIngredientNumber = () => {
        setIngredientNumber(ingredientNumber - 1);
    };

    return (
        <React.Fragment>
            <Button onClick={handleShowForm}>Add recipe</Button>

            <Modal
                visible={formVisible}
                onCancel={handleFormCancel}
                onOk={handleFormOk}
            >
                <Button size="small" onClick={handleShowForm}>
                    Hide
                </Button>

                <Form>
                    <Form.Item label="Recipe name" required={true}>
                        <Input
                            name={"recipeName"}
                            onChange={handleInputChange}
                            value={inputs.recipeName}
                        />
                    </Form.Item>
                    <Form.Item label="Serves" required={true}>
                        <InputNumber
                            name={"serves"}
                            onChange={handleInputNumberChange("serves")}
                            value={inputs.serves}
                            min={1}
                            step={1}
                        />
                    </Form.Item>
                    <Form.Item label={"Ingredients"}>
                        <Input.Group>
                            <Icon
                                type="plus-circle"
                                onClick={incrementIngredientNumber}
                                theme={"filled"}
                            />
                            <Icon
                                type="minus-circle"
                                onClick={decrementIngredientNumber}
                                theme={"filled"}
                            />
                        </Input.Group>
                        {getIngredientInputs(ingredientNumber)}
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default AddRecipeForm;
