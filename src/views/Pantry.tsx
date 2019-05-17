import React from "react";
import Table, { TableProps } from "antd/lib/table";
import Button from "antd/lib/button";
import Spin from "antd/lib/spin";

type Item = {
    id: number;
    name: string;
    size: number;
    measure: string;
    stock: number;
    cost: number;
    recipes: number[];
};

const itemDataURL = "http://localhost:3000/items";

interface State {
    tableData: Item[];
    loading: boolean;
}

class Pantry extends React.Component<{}, State> {
    private columns: TableProps<Item>["columns"];
    constructor(props: {}) {
        super(props);
        this.state = {
            tableData: [],
            loading: true
        };
        this.columns = [
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
                key: "recipes",
                render: (text: string, record: Item) => {
                    return <Button>{`recipes with ${record.name}`}</Button>;
                }
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "action"
            }
        ];
    }

    public async componentDidMount() {
        const itemDataResponse = await fetch(itemDataURL);
        const itemData = await itemDataResponse.json();
        const tableData = itemData.map((item: Item) => {
            return { ...item, key: item.id };
        });
        this.setState({
            tableData: tableData,
            loading: false
        });
    }

    public getTableDisplay = () => {
        if (!this.state.loading) {
            return (
                <Table
                    columns={this.columns}
                    dataSource={this.state.tableData}
                />
            );
        }

        return <Spin size="large" />;
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
