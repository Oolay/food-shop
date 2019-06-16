import React, { useState } from "react";

type Callback = () => void;

const useForm = (onOkcallback: Callback, onCancelCallback: Callback) => {
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

    const handleSelectChange = (fieldName: string) => {
        return (value: string) => {
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
        handleSelectChange,
        inputs,
        formVisible
    };
};

export default useForm;
