import React from "react";
import Button from "antd/lib/button";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import InputNumber from "antd/lib/input-number";
import useForm from "../hooks/useForm";

type Inputs = {
    recipeName: string;
    serves: string;
};

const AddRecipeForm = () => {
    const {
        handleShowForm,
        handleFormCancel,
        handleFormOk,
        handleInputChange,
        inputs,
        formVisible
    }: {
        handleShowForm: () => void;
        handleFormCancel: (event: React.MouseEvent) => void;
        handleFormOk: (event: React.MouseEvent) => void;
        handleInputChange: (event: any) => void;
        inputs: any;
        formVisible: boolean;
    } = useForm(() => {
        console.log(inputs.recipeName);
    });

    return (
        <React.Fragment>
            <Button onClick={handleShowForm}>Add recipe</Button>

            <Modal
                visible={formVisible}
                onCancel={handleFormCancel}
                onOk={handleFormOk}
            >
                <Form>
                    <Form.Item label="Recipe name">
                        <Input
                            name={"recipeName"}
                            onChange={handleInputChange}
                            value={inputs.recipeName}
                        />
                    </Form.Item>
                    <Form.Item label="Serves">
                        <Input
                            name={"serves"}
                            onChange={handleInputChange}
                            value={inputs.serves}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    );
};

export default AddRecipeForm;
