import React from "react";
import { Table, Button } from "antd";

type item = {
    id: number;
    name: string;
    size: number;
    measure: string;
    stock: number;
    cost: number;
    recipes: number[];
};

const itemDataURL = "http://localhost:3000/items";
const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name"
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

class Pantry extends React.Component<{}, { tableData: item[] }> {
    public async componentDidMount() {
        const itemDataResponse = await fetch(itemDataURL);
        const itemData = await itemDataResponse.json();
        const tableData = await itemData.map((item: item, indx: number) => {
            return { ...item, key: indx };
        });
        this.setState({
            tableData: tableData
        });
    }

    public getTableDisplay = () => {
        if (this.state) {
            return (
                <Table columns={columns} dataSource={this.state.tableData} />
            );
        }

        return <div>Data loading</div>;
    };
    render() {
        return (
            <React.Fragment>
                <Button>Add item</Button>
                {this.getTableDisplay()}
            </React.Fragment>
        );
    }
}

export default Pantry;
