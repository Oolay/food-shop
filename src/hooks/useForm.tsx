import React, { useState } from "react";

type Callback = () => void;

const useAddRecipeForm = (callback: Callback) => {
    const [inputs, setInputs]: [any, any] = useState({});
    const [formVisible, setFormVisible] = useState(false);

    const handleShowForm = () => {
        setFormVisible(true);
    };

    const handleFormCancel = (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
        }
        setFormVisible(false);
    };

    const handleFormOk = (event: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
        }
        callback();
        setFormVisible(false);
    };

    const handleInputChange = (event: any) => {
        event.persist();
        setInputs((inputs: any) => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    return {
        handleShowForm,
        handleFormCancel,
        handleFormOk,
        handleInputChange,
        inputs,
        formVisible
    };
};

export default useAddRecipeForm;
