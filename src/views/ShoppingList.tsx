import React from "react";
import { Table, Button } from "antd";

const columns = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date"
    },
    {
        title: "Items",
        dataIndex: "items",
        key: "items"
    },
    {
        title: "Cost",
        dataIndex: "cost",
        key: "cost"
    },
    {
        title: "Savings",
        dataIndex: "savings",
        key: "savings"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action"
    }
];

class ShoppingList extends React.Component<any, any> {
    render() {
        return (
            <React.Fragment>
                <Button>Add shopping list</Button>
                <Table columns={columns} />;
            </React.Fragment>
        );
    }
}

export default ShoppingList;
