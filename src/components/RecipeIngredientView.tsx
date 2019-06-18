import React from "react";
import Modal from "antd/lib/modal";
import Table, { TableProps } from "antd/lib/table";
import { ExistingPantryEntry, ExistingTableEntry } from "../api/tableApi";

type IngredientEntry = {
    primeId: number;
    ingredientName: string;
    ingredientSize: number;
    itemUnit: string;
    ingredientQuantity: number;
};

type Props = {
    visible: boolean;
    onCancel: () => void;
    tableData: ExistingTableEntry[];
};

const RecipeIngredientView = (props: Props) => {
    const { visible, onCancel, tableData } = props;

    const columns = [
        {
            title: "Name",
            dataIndex: "ingredientName",
            key: "ingredientName"
        },
        {
            title: "Size",
            dataIndex: "ingredientSize",
            key: "ingredientSize"
        },
        {
            title: "Unit",
            dataIndex: "itemUnit",
            key: "itemUnit"
        },
        {
            title: "Quantity",
            dataIndex: "ingredientQuantity",
            key: "ingredientQuantity"
        }
    ];

    return (
        <Modal visible={visible} onCancel={onCancel}>
            <Table columns={columns} dataSource={tableData} />
        </Modal>
    );
};

export default RecipeIngredientView;
