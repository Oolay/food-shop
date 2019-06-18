import React, { useState } from "react";
import { ExistingTableEntry } from "../api/tableApi";

type Callback = (entry: ExistingTableEntry) => () => Promise<any>;

const useEntryDetaillModal = (callback: Callback) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTableData, setModalTableData] = useState([]);

    const onShowModal = (entry: ExistingTableEntry) => async () => {
        const modalTableData = await callback(entry)();
        console.log(modalTableData);

        setModalTableData(modalTableData);
        setModalVisible(true);
    };

    const onCancel = () => {
        setModalVisible(false);
    };

    return {
        onShowModal,
        onCancel,
        modalVisible,
        modalTableData
    };
};

export default useEntryDetaillModal;
