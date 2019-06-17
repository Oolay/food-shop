import React, { useState } from "react";

type Callback = () => void;
type OnUnitSelectCallback = (value: string, ingredientId: number) => void;

const useForm = (
    onOkcallback: Callback,
    onCancelCallback: Callback,
    onUnitSelectCallback: OnUnitSelectCallback
) => {
    const [inputs, setInputs]: [any, any] = useState({});
    const [formVisible, setFormVisible] = useState(false);

    const handleShowForm = () => {
        setFormVisible(!formVisible);
    };

    const handleFormCancel = (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
        }
        onCancelCallback();
        setFormVisible(false);
        setInputs({});
    };

    const handleFormOk = (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
        }
        onOkcallback();
        setFormVisible(false);
        setInputs({});
    };

    const handleInputNumberChange = (fieldName: string) => {
        return (value: number | undefined) => {
            if (value) {
                setInputs({
                    ...inputs,
                    [fieldName]: value
                });
            }
        };
    };

    const handleIngredientUnitSelectChange = (
        fieldName: string,
        ingredientId: number
    ) => {
        return (value: string) => {
            onUnitSelectCallback(value, ingredientId);
            setInputs({
                ...inputs,
                [fieldName]: value
            });
        };
    };

    const handleInputChange = (event: any) => {
        const eventPersist = event;
        setInputs({
            ...inputs,
            [eventPersist.target.name]: eventPersist.target.value
        });
    };

    return {
        handleShowForm,
        handleFormCancel,
        handleFormOk,
        handleInputChange,
        handleInputNumberChange,
        handleIngredientUnitSelectChange,
        inputs,
        formVisible
    };
};

export default useForm;
