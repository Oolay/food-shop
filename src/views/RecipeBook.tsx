import React from "react";
import { Table, Button } from "antd";

const columns = [
    {
        title: "Recipe",
        dataIndex: "recipe",
        key: "recipe"
    },
    {
        title: "Serves",
        dataIndex: "serves",
        key: "serves"
    },
    {
        title: "Ingredients",
        dataIndex: "ingredients",
        key: "ingredients"
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

class RecipeBook extends React.Component<{}> {
    render() {
        return (
            <React.Fragment>
                <Button>Add recipe</Button>
                <Table columns={columns} />
            </React.Fragment>
        );
    }
}

export default RecipeBook;
