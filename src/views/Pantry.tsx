import React from "react";
import { Table, Button } from "antd";

const columns = [
    {
        title: "Item",
        dataIndex: "item",
        key: "item"
    },
    {
        title: "Size",
        dataIndex: "size",
        key: "size"
    },
    {
        title: "Measure",
        dataIndex: "measure",
        key: "measure"
    },
    {
        title: "Stock",
        dataIndex: "stock",
        key: "stock"
    },
    {
        title: "Recipes",
        dataIndex: "recipes",
        key: "recipes"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action"
    }
];

class Pantry extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <Button>Add item</Button>
                <Table columns={columns} />
            </React.Fragment>
        );
    }
}

export default Pantry;
